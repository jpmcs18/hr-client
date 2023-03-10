import React, { useState } from 'react';
import CustomReturn from '../../models/client-model/CustomReturn';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { getTheme, setTheme } from '../../repositories/session-managers';
import { saveProfile } from '../../repositories/system-user-queries';
import UpdateUserProfile from '../../models/request-model/UpdateProfile';
import CustomCheckBox from '../components/custom-checkbox';
import CustomCheckBoxButton from '../components/custom-checkbox-button';
import CustomPassword from '../components/custom-password';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { userProfileAction } from '../../state/reducers/user-profile-reducer';

export default function ManageProfile({ onClose }: { onClose: () => void }) {
  const [darkMode, setdarkMode] = useState(() => !!getTheme());
  const [changePassword, setChangePassword] = useState(false);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const [user, setUser] = useState<UpdateUserProfile>(() => {
    return {
      username: userProfileState.systemUser?.username ?? '',
      password: '',
      confirmNewPassword: '',
      newPassword: '',
    };
  });

  const setBusy = useSetBusy();
  const setMessage = useSetMessage();
  const setToasterMessage = useSetToasterMessage();
  async function saveData() {
    if (changePassword && user.newPassword !== user.confirmNewPassword) {
      setToasterMessage({ content: 'Password not match.' });
      return;
    }
    setBusy(true);
    await saveProfile(
      user.username,
      changePassword ? user.password : null,
      changePassword ? user.confirmNewPassword : null
    )
      .finally(() => {
        setMessage({
          message: 'User Information Saved',
          onOk: () => {
            dispatch(
              userProfileAction.setProfile({
                ...userProfileState.systemUser!,
                username: user.username,
              })
            );
            onClose();
          },
        });
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }

  function onChange({ elementName, value }: CustomReturn) {
    setUser((prevUser) => {
      return { ...prevUser, [elementName]: value };
    });
  }
  return (
    <Modal className='profile-modal' onClose={onClose} title='Users Profile'>
      <div className='modal-content-body'>
        <div>
          <CustomCheckBoxButton
            isCheck={darkMode}
            CheckedTitle='Dark Mode'
            UncheckedTitle='Light Mode'
            onChange={(e) => {
              setdarkMode(() => !!e.value);
              setTheme(!!e.value);
              if (!!e.value) {
                document.body.classList.add('dark-mode');
              } else {
                document.body.classList.remove('dark-mode');
              }
            }}
          />
        </div>
        <div>
          <CustomTextBox
            title='Name'
            readonly={true}
            value={userProfileState.systemUser?.displayName}
          />
          <CustomTextBox
            title='Username'
            name='username'
            value={user?.username}
            onChange={onChange}
          />
          <div className='group-check'>
            <div className='header'>
              <CustomCheckBox
                text='Change Password'
                checkChange={() => {
                  setChangePassword((x) => !x);
                }}
                isCheck={changePassword}
              />
            </div>
            <div className='content'>
              <CustomPassword
                title='Current Password'
                name='password'
                value={user?.password}
                onChange={onChange}
                disabled={!changePassword}
              />
              <CustomPassword
                title='New Password'
                name='newPassword'
                value={user?.newPassword}
                onChange={onChange}
                disabled={!changePassword}
              />
              <CustomPassword
                title='Confirm New Password'
                name='confirmNewPassword'
                value={user?.confirmNewPassword}
                onChange={onChange}
                disabled={!changePassword}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <button onClick={saveData} className='btn-modal btn-primary'>
          SAVE
        </button>
      </div>
    </Modal>
  );
}
