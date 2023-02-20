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
import { useMemo, useState } from 'react';
import ModuleRoutes from '../routes';
import Dashboard from './dashboard';
import ManageProfile from './modals/manage-profile';
import Icon from './components/icon';
export default function HomePage() {
  const [showProfile, setShowProfile] = useState(false);
  const authorize = useAuthorize();
  const profile = useUserProfile();
  const updateAuthorize = useUpdateAuthorize();
  const setMessage = useSetMessage();
  const [showMenu, setShowMenu] = useState(false);
  // const menus: MenuItem[] = getSessionMenus() ?? [];
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
                            to={ModuleRoutes.Home}
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
                          {/* {menus.map((menu) => (
                            <div className='menu-items' key={menu.name}>
                              {menu.isHead ? (
                                <>
                                  <div className='head'>{menu.name}</div>
                                  <div className='navs'>
                                    {menu.menus?.map((nav) => (
                                      <div
                                        key={nav.route}
                                        className='menu-item'>
                                        <NavLink
                                          onClick={() =>
                                            setShowMenu(() => false)
                                          }
                                          to={nav.route ?? ''}
                                          className='nav-menu'>
                                          {nav.name}
                                          <FontAwesomeIcon
                                            className='menu-icon'
                                            icon={faAngleRight as IconProp}
                                          />
                                        </NavLink>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <div className='menu-item main-menus'>
                                  <NavLink
                                    onClick={() => setShowMenu(() => false)}
                                    to={menu.route ?? ''}
                                    className='nav-menu'>
                                    {menu.name}
                                    <FontAwesomeIcon
                                      className='menu-icon'
                                      icon={faAngleRight as IconProp}
                                    />
                                  </NavLink>
                                </div>
                              )}
                            </div>
                          ))} */}
                        </div>
                      </div>
                      <div
                        className='menu-content-blocker'
                        onClick={() => setShowMenu(() => false)}></div>
                    </div>
                  </div>
                <NavLink to={ModuleRoutes.Home} className='nav-icon'>
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
              path={ModuleRoutes.Home}
              element={<Navigate to={ModuleRoutes.Dashboard} replace />}
            />
            <Route path={ModuleRoutes.Dashboard} element={<Dashboard />} />
            <Route
              path='*'
              element={<Navigate to={ModuleRoutes.Home} replace />}
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
