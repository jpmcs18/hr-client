import { useState } from 'react';
import CustomReturn from '../models/client-model/CustomReturn';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../custom-hooks/authorize-provider';
import { authenticate } from '../repositories/security-queries';
import { getData } from '../repositories/system-user-queries';
import LoginRequest from '../models/request-model/LoginRequest';
import CustomPassword from './components/custom-password';
import CustomTextBox from './components/custom-textbox';
import { getDistinctModuleRights } from '../repositories/module-right-queries';
import { useDispatch } from 'react-redux';
import { userProfileAction } from '../state/reducers/user-profile-reducer';

export default function LoginPage() {
  const [user, setUser] = useState<LoginRequest>({
    username: '',
    password: '',
  });
  const setToasterMessage = useSetToasterMessage();
  const setBusy = useSetBusy();
  const dispatch = useDispatch();
  async function signIn() {
    setBusy(true);
    await authenticate(user)
      .then(async (res) => {
        if (res) {
          await getProfile();
          await getDistinctAccess();
          dispatch(userProfileAction.setAuthorize(res));
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
          dispatch(userProfileAction.setAccess(res));
          console.log(res);
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
          dispatch(userProfileAction.setProfile(res));
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
  return (
    <section>
      <div className='login-container'>
        <div className='login-header'>
          <h1>Authentication</h1>
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
          <button onClick={signIn} className='btn btn-signin'>
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
