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
import { SystemModules } from '../routes';
import { userProfileActions } from '../state/reducers/user-profile-reducer';
import { RootState } from '../state/store';
import PositionPage from './components/position-components/position-page';
import EmployeePage from './components/employee-components/employee-page';
import Icon from '../icon';
import OfficePage from './components/office-components/office-page';
import SystemUserPage from './components/system-user-component/system-user-page';
import UserRolePage from './components/user-role-component/user-role-page';
import Dashboard from './dashboard';
import ManageProfile from './modals/manage-profile';
import { getPage } from '../helper';
import { Pages } from '../constant';
import SalaryGradePage from './components/salary-grade-components/salary-grade-page';
import ReportPage from './components/report-components/report-page';
import RequestHistoryPage from './components/request-history-components/request-history-page';
import LeaveRequestPage from './components/leave-request-components/leave-request-page';
import LeaveRequestApproverPage from './components/leave-request-approver-components/leave-request-approver-page';
import WorkSchedulePage from './components/work-schedule-components/work-schedule-page';
import TimeLogPage from './components/timelog-components/timelog-page';
import DTRExportPage from './components/dtr-export-components/dtr-export-page';
import KeyGenerator from './key-generator';
import ActivityLogPage from './components/activity-log-components/activity-log-page';
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
        dispatch(userProfileActions.clearProfile());
        setShowProfile(false);
      },
    });
  }
  return (
    <>
      {userProfileState.authorize === undefined ? (
        <div></div>
      ) : userProfileState.authorize ? (
        <BrowserRouter>
          <header>
            <nav>
              <div className='menu-container'>
                {(!!userProfileState.module.length ||
                  userProfileState.systemUser?.isAdmin) && (
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
                )}
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

            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.Employees).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.Employees).route}
                element={<EmployeePage />}
              />
            )}
            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.Positions).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.Positions).route}
                element={<PositionPage />}
              />
            )}

            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.Offices).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.Offices).route}
                element={<OfficePage />}
              />
            )}

            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.Users).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.Users).route}
                element={<SystemUserPage />}
              />
            )}

            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.UserRoles).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.UserRoles).route}
                element={<UserRolePage />}
              />
            )}

            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.Reports).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.Reports).route}
                element={<ReportPage />}
              />
            )}

            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.SalaryGrade).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.SalaryGrade).route}
                element={<SalaryGradePage />}
              />
            )}
            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.RequestHistory).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.RequestHistory).route}
                element={<RequestHistoryPage />}
              />
            )}
            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.LeaveRequests).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.LeaveRequests).route}
                element={<LeaveRequestPage />}
              />
            )}
            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.LeaveRequestApprovers).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.LeaveRequestApprovers).route}
                element={<LeaveRequestApproverPage />}
              />
            )}
            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.WorkSchedules).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.WorkSchedules).route}
                element={<WorkSchedulePage />}
              />
            )}
            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.TimeLogs).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.TimeLogs).route}
                element={<TimeLogPage />}
              />
            )}
            {(!!userProfileState.module.filter(
              (x) => x === getPage(Pages.DTRExport).id
            ).length ||
              userProfileState.systemUser?.isAdmin) && (
              <Route
                path={getPage(Pages.DTRExport).route}
                element={<DTRExportPage />}
              />
            )}
            {userProfileState.systemUser?.isAdmin && (
              <Route
                path={getPage(Pages.KeyGenerator).route}
                element={<KeyGenerator />}
              />
            )}
            {userProfileState.systemUser?.isAdmin && (
              <Route
                path={getPage(Pages.ActivityLog).route}
                element={<ActivityLogPage />}
              />
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
