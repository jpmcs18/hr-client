import { useState } from 'react';
import CustomReturn from '../client-model/CustomReturn';
import {
  useSetBusy,
  useSetToasterMessage,
  useUpdateAuthorize,
  useUpdateUserProfile,
} from '../custom-hooks/authorize-provider';
import { authenticate } from '../repositories/security-queries';
import LoginRequest from '../request-model/LoginRequest';
import CustomPassword from './components/custom-password';
import CustomTextBox from './components/custom-textbox';

export default function LoginPage() {
  const [user, setUser] = useState<LoginRequest>({
    username: '',
    password: '',
  });
  const updateProfile = useUpdateUserProfile();
  const updateAuthorize = useUpdateAuthorize();
  const setToasterMessage = useSetToasterMessage();
  const setBusy = useSetBusy();
  async function signIn() {
    setBusy(true);
    await authenticate(user)
      .then(async (res) => {
        if (res) {
          //   await getProfile();
          updateAuthorize(res);
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  //   async function getLookups(): Promise<MenuItem[] | undefined> {
  //     return await getModuleListOfLookups()
  //       .then((res) => {
  //         if (res !== undefined) {
  //           return res.map((m) => {
  //             return {
  //               name: m.description,
  //               route: m.route,
  //             };
  //           });
  //         }
  //         return [];
  //       })
  //       .finally(() => []);
  //   }
  //   async function getListOfModule(user: SystemUser) {
  //     setBusy(true);
  //     await getModuleListOfMains()
  //       .then(async (res) => {
  //         if (res !== undefined) {
  //           const menuItems: MenuItem[] = [];

  //           for (const module of res.filter(
  //             (x) =>
  //               user.systemUserAccess?.some(
  //                 (y) => y.moduleRight.moduleId === x.id && y.granted
  //               ) || user.isAdmin
  //           )) {
  //             if (module.description === 'Lookups') {
  //               var data = {
  //                 isHead: true,
  //                 name: module.description,
  //                 menus: await getLookups(),
  //               };
  //               menuItems.push(data);
  //             } else {
  //               menuItems.push({
  //                 name: module.description,
  //                 route: module.route,
  //               });
  //             }
  //           }

  //           saveSessionMenus(menuItems);
  //         }
  //       })
  //       .catch((err) => {
  //         setToasterMessage({ content: err.message });
  //       })
  //       .finally(() => setBusy(false));
  //   }

  //   async function getProfile() {
  //     setBusy(true);
  //     await getUserData()
  //       .then(async (res) => {
  //         if (res !== undefined) {
  //           saveSessionProfile(res);
  //           updateProfile(res);
  //           //   await getListOfModule(res);
  //         }
  //       })
  //       .catch((err) => {
  //         setToasterMessage({ content: err.message });
  //       })
  //       .finally(() => setBusy(false));
  //   }
  function onTextChange({ elementName, value }: CustomReturn) {
    console.log(elementName, value);
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
          <label className='login-title'>Login</label>
        </div>
        <div className='login-content'>
          <CustomTextBox
            title='Username'
            name='username'
            id='username'
            value={user.username}
            onChange={onTextChange}
            onKeyPress={onKeyPress}
          />
          <CustomPassword
            title='Password'
            name='password'
            id='password'
            value={user.password}
            onChange={onTextChange}
            onKeyPress={onKeyPress}
          />
          <button onClick={signIn} className='btn'>
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
