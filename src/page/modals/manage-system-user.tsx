import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { getEmployees } from '../../repositories/employee-queries';
import {
  insertSystemUser,
  updateSystemUser,
} from '../../repositories/system-user-queries';
import { getUserRoles } from '../../repositories/user-role-queries';
import { systemUserModalActions } from '../../state/reducers/system-user-modal-reducer';
import { systemUserActions } from '../../state/reducers/system-user-reducer';
import { RootState } from '../../state/store';
import CustomCheckBoxButton from '../components/custom-checkbox-button';
import CustomDropdown from '../components/custom-dropdown';
import CustomTextBox from '../components/custom-textbox';
import ManageSystemUserPositionsTable from './manage-system-user-access-table';
import Modal from './modal';

export default function ManageSystemUser() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();

  const systemUserModalState = useSelector(
    (state: RootState) => state.systemUserModal
  );
  useEffect(
    () => {
      getUsrRoles();
      getEmp();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(systemUserModalActions.setShowModal(false));
    if (hasChange) dispatch(systemUserActions.setInitiateSearch(true));
  }
  async function getEmp() {
    setBusy(true);
    await getEmployees()
      .then((res) => {
        if (res) {
          dispatch(systemUserModalActions.setEmployees(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
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
            setToasterMessage({ content: 'User has been updated.' });
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
            setToasterMessage({ content: 'New user has been added.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  return (
    <Modal
      className='system-user-modal'
      onClose={() => onModalClose(false)}
      title='Manage User'>
      <div className='modal-content-body system-user-content-body'>
        <div>
          <CustomDropdown
            title='Employee'
            name='employeeId'
            value={systemUserModalState.systemUser.employeeId}
            onChange={(ret) => {
              dispatch(systemUserModalActions.updateSystemUser(ret));
            }}
            itemsList={systemUserModalState.employees.map((x) => {
              return {
                key: x.id.toString(),
                value: `${x.fullName} (${x.office?.abbreviation})`,
              };
            })}
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
          <div>
            <CustomDropdown
              title='Roles'
              onChange={(ret) => {
                dispatch(systemUserModalActions.addNewUserRole(ret.value));
              }}
              itemsList={systemUserModalState.userRoles.map((x) => {
                return {
                  key: x.id.toString(),
                  value: x.description,
                };
              })}
            />
            <ManageSystemUserPositionsTable />
          </div>
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
    </Modal>
  );
}
