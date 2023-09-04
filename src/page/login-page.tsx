import { faPaperPlane, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../custom-hooks/authorize-provider';
import CustomReturn from '../models/client-model/CustomReturn';
import LoginRequest from '../models/request-model/LoginRequest';
import { getDistinctModuleRights } from '../repositories/module-right-queries';
import { generateOTP, validateOTP } from '../repositories/otp-queries';
import { authenticate } from '../repositories/security-queries';
import { getData } from '../repositories/system-user-queries';
import { userProfileActions } from '../state/reducers/user-profile-reducer';
import { RootState } from '../state/store';
import CustomPassword from './components/custom-password';
import CustomTextBox from './components/custom-textbox';

export default function LoginPage() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const [user, setUser] = useState<LoginRequest>({
    username: '',
    password: '',
  });
  const setToasterMessage = useSetToasterMessage();
  const [startTimer, setStartTimer] = useState(false);
  const setBusy = useSetBusy();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(
    () => {
      if (!userProfileState.systemUser?.allow2FA) {
        dispatch(userProfileActions.saveSession());
        dispatch(userProfileActions.initializeState());
      } else {
        generateOTPCode();
      }
    },
    //eslint-disable-next-line
    [userProfileState.systemUser]
  );
  useEffect(
    () => {
      if (startTimer) {
        dispatch(userProfileActions.setTimer(3));
        const timer = setInterval(() => {
          dispatch(userProfileActions.decrementTimer());
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      }
    },
    //eslint-disable-next-line
    [startTimer]
  );
  useEffect(
    () => {
      if (userProfileState.OTP6 !== undefined) {
        validateOTPCode();
      }
    },
    //eslint-disable-next-line
    [userProfileState.OTP6]
  );

  async function validateOTPCode() {
    setBusy(true);
    await validateOTP(
      userProfileState.systemUser?.id ?? 0,
      userProfileState.OTP1! +
        userProfileState.OTP2! +
        userProfileState.OTP3! +
        userProfileState.OTP4! +
        userProfileState.OTP5! +
        userProfileState.OTP6!
    )
      .then((res) => {
        if (res) {
          dispatch(userProfileActions.saveSession());
          dispatch(userProfileActions.initializeState());
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  async function generateOTPCode() {
    setBusy(true);
    await generateOTP(userProfileState.systemUser?.id ?? 0)
      .then((res) => {
        if (res) {
          setStartTimer(() => false);
          setToasterMessage({ content: 'OTP Sent' });
          setStartTimer(() => true);
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => {
        setBusy(false);
        inputRef.current?.focus();
      });
  }
  async function signIn() {
    setBusy(true);
    await authenticate(user)
      .then(async (res) => {
        if (res) {
          await getProfile();
          await getDistinctAccess();
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function getDistinctAccess() {
    setBusy(true);
    await getDistinctModuleRights()
      .then(async (res) => {
        if (res !== undefined) {
          dispatch(userProfileActions.setAccess(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function getProfile() {
    setBusy(true);
    await getData()
      .then(async (res) => {
        if (res !== undefined) {
          dispatch(userProfileActions.setProfile(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  function onTextChange({ elementName, value }: CustomReturn) {
    setUser({ ...user, [elementName]: value });
  }
  function onKeyPress(key: React.KeyboardEvent<HTMLDivElement>) {
    if (key.key === 'Enter') {
      if (user.username === '') {
        document.getElementById('username')?.focus();
        return;
      }
      if (user.password === '') {
        document.getElementById('password')?.focus();
        return;
      }

      signIn();
    }
  }
  function onKeyDown(key: React.KeyboardEvent<HTMLInputElement>) {
    if (key.key === 'Backspace') {
      dispatch(userProfileActions.removeOTP());
    }
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.match(/^[0-9\b]+$/)) {
      dispatch(userProfileActions.setOTP(e.target.value));
    }
    inputRef.current!.value = '';
  }
  return (
    <section>
      <div className='login-container'>
        {!userProfileState.systemUser?.allow2FA ? (
          <>
            <div className='login-header'>
              <h1>HUMAN RESOURCE INFORMATION SYSTEM</h1>
            </div>
            <div className='login-content'>
              <CustomTextBox
                title='Username'
                name='username'
                id='username'
                className='username'
                value={user.username}
                onChange={onTextChange}
                onKeyPress={onKeyPress}
              />
              <CustomPassword
                title='Password'
                name='password'
                id='password'
                className='password'
                value={user.password}
                onChange={onTextChange}
                onKeyPress={onKeyPress}
              />
              <div className='btn-actions-group'>
                <button onClick={signIn} className='btn-action'>
                  <FontAwesomeIcon icon={faSignIn} />
                  <span className='desktop-features'>Login</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <input
              type='text'
              ref={inputRef}
              style={{ opacity: 0 }}
              onKeyDown={onKeyDown}
              onChange={onChange}
            />
            <div
              className='otp-main-container'
              onClick={() => inputRef.current?.focus()}>
              <div className='otp-container'>
                <label className='otp'>{userProfileState.OTP1}</label>
              </div>
              <div className='otp-container'>
                <label className='otp'>{userProfileState.OTP2}</label>
              </div>
              <div className='otp-container'>
                <label className='otp'>{userProfileState.OTP3}</label>
              </div>
              <div className='otp-container'>
                <label className='otp'>{userProfileState.OTP4}</label>
              </div>
              <div className='otp-container'>
                <label className='otp'>{userProfileState.OTP5}</label>
              </div>
              <div className='otp-container'>
                <label className='otp'>{userProfileState.OTP6}</label>
              </div>
            </div>
            <div className='otp-footer'>
              <label>
                {userProfileState.timerMinute.toString().padStart(2, '0')}:
                {userProfileState.timerSecond.toString().padStart(2, '0')}
              </label>
              <button
                className='btn-tool'
                onClick={generateOTPCode}
                disabled={
                  userProfileState.timerMinute > 0 ||
                  userProfileState.timerSecond > 0
                }>
                <FontAwesomeIcon icon={faPaperPlane} />
                <span className='desktop-features'>Resend OTP</span>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
