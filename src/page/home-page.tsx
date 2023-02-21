import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import {
  useAuthorize,
  useSetMessage,
  useUpdateAuthorize,
  useUserProfile,
} from '../custom-hooks/authorize-provider';
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
import SystemModules from '../routes';
import Icon from './components/icon';
import Dashboard from './dashboard';
import ManageProfile from './modals/manage-profile';
import ModuleRoute from '../client-model/ModuleRoute';
import EmployeePage from './components/employee-components/employee-page';
import DesignationPage from './components/designation-components/designation-page';
export default function HomePage() {
  const [showProfile, setShowProfile] = useState(false);
  const authorize = useAuthorize();
  const profile = useUserProfile();
  const updateAuthorize = useUpdateAuthorize();
  const setMessage = useSetMessage();
  const [showMenu, setShowMenu] = useState(false);
  const [menus, setMenus] = useState<ModuleRoute[]>([]);
  function logoutUser() {
    setMessage({
      message: 'Continue to logout?',
      action: 'YESNO',
      onOk: () => {
        updateAuthorize(false);
        setShowProfile(false);
      },
    });
  }

  return (
    <>
      {authorize ? (
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
                            {profile?.displayName}
                            <FontAwesomeIcon
                              className='name-icon'
                              icon={faAngleRight as IconProp}
                            />
                          </label>
                          <span className='name-subtitle'>
                            {profile?.username}
                          </span>
                        </div>
                        <button
                          onClick={logoutUser}
                          className='nav-menu logout'>
                          Logout
                        </button>
                      </div>
                      <div className='menus-container'>
                        {(profile?.isAdmin
                          ? SystemModules.filter((x) => x.display)
                          : menus
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
                <NavLink to={SystemModules[0].route} className='nav-icon'>
                  <Icon />
                </NavLink>
              </div>
              <div className='menu-container desktop-profile'>
                <div>
                  <label
                    className='nav-menu'
                    onClick={() => setShowProfile(true)}>
                    {profile?.displayName ?? 'Hello'}
                  </label>
                  <span className='name-subtitle'>{profile?.username}</span>
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
            <Route path={SystemModules[2].route} element={<EmployeePage />} />
            <Route
              path={SystemModules[3].route}
              element={<DesignationPage />}
            />
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
