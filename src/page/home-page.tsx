import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import { useSetMessage } from '../custom-hooks/authorize-provider';
import LoginPage from './login-page';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleRight,
  faBars,
  faHome,
  faPowerOff,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SystemModules from '../routes';
import { userProfileAction } from '../state/reducers/user-profile-reducer';
import { RootState } from '../state/store';
import DesignationPage from './components/designation-components/designation-page';
import EmployeePage from './components/employee-components/employee-page';
import Icon from './components/icon';
import OfficePage from './components/office-components/office-page';
import SystemUserPage from './components/system-user-component/system-user-page';
import UserRolePage from './components/user-role-component/user-role-page';
import Dashboard from './dashboard';
import ManageProfile from './modals/manage-profile';
export default function HomePage() {
  const [showProfile, setShowProfile] = useState(false);
  const setMessage = useSetMessage();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  function logoutUser() {
    setMessage({
      message: 'Continue to logout?',
      action: 'YESNO',
      onOk: () => {
        dispatch(userProfileAction.clearProfile());
        setShowProfile(false);
      },
    });
  }
  return (
    <>
      {userProfileState.authorize ? (
        <BrowserRouter>
          <header>
            <nav>
              <div className='menu-container'>
                <div className='nav-menu-container'>
                  <button
                    className='nav-icon'
                    onClick={() => setShowMenu(() => true)}>
                    <FontAwesomeIcon icon={faBars as IconProp} />
                  </button>
                  <div className={'menus ' + (showMenu ? 'menu-show' : '')}>
                    <div className='menu-item-container'>
                      <div className='menu-item-header'>
                        <NavLink
                          onClick={() => setShowMenu(() => false)}
                          to={SystemModules[0].route}
                          className='nav-icon home-icon'>
                          <FontAwesomeIcon icon={faHome as IconProp} />
                        </NavLink>
                        <button
                          className='nav-icon close-nav-menu'
                          onClick={() => setShowMenu(() => false)}>
                          <FontAwesomeIcon icon={faTimes as IconProp} />
                        </button>
                      </div>

                      <div className='menu-container mobile-profile'>
                        <div className='name'>
                          <label
                            className='nav-menu'
                            onClick={() => {
                              setShowProfile(true);
                              setShowMenu(() => false);
                            }}>
                            {userProfileState.systemUser?.displayName}
                            <FontAwesomeIcon
                              className='name-icon'
                              icon={faAngleRight as IconProp}
                            />
                          </label>
                          <span className='name-subtitle'>
                            {userProfileState.systemUser?.username}
                          </span>
                        </div>
                        <button
                          onClick={logoutUser}
                          className='nav-menu logout'>
                          Logout
                        </button>
                      </div>
                      <div className='menus-container'>
                        {SystemModules.filter(
                          (x) =>
                            x.display &&
                            (userProfileState.systemUser?.isAdmin ||
                              !!userProfileState.module.filter(
                                (y) => y === x.id
                              ).length)
                        ).map((menu) => (
                          <div className='menu-items' key={menu.pageName}>
                            <div className='menu-item main-menus'>
                              <NavLink
                                onClick={() => setShowMenu(() => false)}
                                to={menu.route ?? ''}
                                className='nav-menu'>
                                {menu.pageName}
                                <FontAwesomeIcon
                                  className='menu-icon'
                                  icon={faAngleRight as IconProp}
                                />
                              </NavLink>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className='menu-content-blocker'
                      onClick={() => setShowMenu(() => false)}></div>
                  </div>
                </div>
                <NavLink to={SystemModules[1].route} className='nav-icon'>
                  <Icon />
                </NavLink>
              </div>
              <div className='menu-container desktop-profile'>
                <div>
                  <label
                    className='nav-menu'
                    onClick={() => setShowProfile(true)}>
                    {userProfileState.systemUser?.displayName ?? '---'}
                  </label>
                  <span className='name-subtitle'>
                    {userProfileState.systemUser?.username}
                  </span>
                </div>
                <button onClick={logoutUser} className='nav-icon'>
                  <FontAwesomeIcon icon={faPowerOff as IconProp} />
                </button>
              </div>
            </nav>
          </header>
          <Routes>
            <Route
              path={SystemModules[0].route}
              element={<Navigate to={SystemModules[1].route} replace />}
            />
            <Route path={SystemModules[1].route} element={<Dashboard />} />

            {(!!userProfileState.module.filter((x) => x === SystemModules[2].id)
              .length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route path={SystemModules[2].route} element={<EmployeePage />} />
            )}
            {(!!userProfileState.module.filter((x) => x === SystemModules[3].id)
              .length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={SystemModules[3].route}
                element={<DesignationPage />}
              />
            )}

            {(!!userProfileState.module.filter((x) => x === SystemModules[4].id)
              .length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route path={SystemModules[4].route} element={<OfficePage />} />
            )}

            {(!!userProfileState.module.filter((x) => x === SystemModules[5].id)
              .length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={SystemModules[5].route}
                element={<SystemUserPage />}
              />
            )}

            {(!!userProfileState.module.filter((x) => x === SystemModules[6].id)
              .length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route path={SystemModules[6].route} element={<UserRolePage />} />
            )}
            <Route
              path='*'
              element={<Navigate to={SystemModules[0].route} replace />}
            />
          </Routes>
          <div>
            {showProfile && (
              <ManageProfile onClose={() => setShowProfile(false)} />
            )}
          </div>
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
