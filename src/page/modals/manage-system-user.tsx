import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import Employee from '../../models/entities/Employee';
import {
  insertSystemUser,
  updateSystemUser,
} from '../../repositories/system-user-queries';
import { getUserRoles } from '../../repositories/user-role-queries';
import { employeeSearchableActions } from '../../state/reducers/employee-searchable-reducer';
import { systemUserModalActions } from '../../state/reducers/system-user-modal-reducer';
import { systemUserActions } from '../../state/reducers/system-user-reducer';
import { RootState } from '../../state/store';
import CustomCheckBoxButton from '../components/custom-checkbox-button';
import CustomSelector from '../components/custom-selector';
import CustomTextBox from '../components/custom-textbox';
import ManageSystemUserPositionsTable from './manage-system-user-access-table';
import Modal from './modal';
import EmployeeSearchable from './searchables/employee-searchable';

export default function ManageSystemUser() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );

  const systemUserModalState = useSelector(
    (state: RootState) => state.systemUserModal
  );
  useEffect(
    () => {
      getUsrRoles();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(systemUserModalActions.setShowModal(false));
    if (hasChange) dispatch(systemUserActions.setInitiateSearch(true));
  }
  async function getUsrRoles() {
    setBusy(true);
    await getUserRoles()
      .then((res) => {
        if (res) {
          dispatch(systemUserModalActions.setUserRoles(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (systemUserModalState.systemUser.id > 0) {
      await updateSystemUser(
        systemUserModalState.systemUser,
        systemUserModalState.newUserRole,
        systemUserModalState.deletedUserAccess
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'User updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertSystemUser(
        systemUserModalState.systemUser,
        systemUserModalState.newUserRole
      )
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New user added.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  function onCloseEmployeeSearch(employee?: Employee) {
    if (employee) {
      dispatch(
        systemUserModalActions.updateSystemUser({
          elementName: 'employee',
          value: employee,
        })
      );
      dispatch(
        systemUserModalActions.updateSystemUser({
          elementName: 'employeeId',
          value: employee.id,
        })
      );
    }
  }
  return (
    <Modal
      className='system-user-modal'
      onClose={() => onModalClose(false)}
      title='Manage User'>
      <div className='modal-content-body system-user-content-body'>
        <div>
          <CustomSelector
            title='Employee'
            value={systemUserModalState.systemUser?.employee?.fullName}
            onSelectorClick={() => {
              dispatch(
                employeeSearchableActions.setOnCloseFunction(
                  onCloseEmployeeSearch
                )
              );
              dispatch(employeeSearchableActions.setShowModal(true));
            }}
          />
          <CustomTextBox
            title='Username'
            name='username'
            value={systemUserModalState.systemUser?.username}
            onChange={(ret) => {
              dispatch(systemUserModalActions.updateSystemUser(ret));
            }}
          />
          <CustomCheckBoxButton
            CheckedTitle='Administrator'
            UncheckedTitle='User'
            onChange={() =>
              dispatch(
                systemUserModalActions.updateSystemUser({
                  elementName: 'isAdmin',
                  value: !systemUserModalState.systemUser.isAdmin,
                })
              )
            }
            isCheck={systemUserModalState.systemUser.isAdmin}
          />
        </div>
        {!systemUserModalState.systemUser.isAdmin && (
          <ManageSystemUserPositionsTable />
        )}
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save</span>
          </button>
        </div>
      </div>
      <>{employeeSearchableState.isModalShow && <EmployeeSearchable />}</>
    </Modal>
  );
}
