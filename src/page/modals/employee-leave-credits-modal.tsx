import {
  faAdd,
  faEdit,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { hasAccess, toCommaSeparateAmount } from '../../helper';
import { getEmployeeLeaveCredits } from '../../repositories/employee-leave-credits-queries';
import { employeeLeaveCreditsActions } from '../../state/reducers/employee-leave-credits-reducer';
import { RootState } from '../../state/store';
import Modal from './modal';

export default function EmployeeLeaveCreditsModal() {
  const employeeLeaveCreditsState = useSelector(
    (state: RootState) => state.employeeLeaveCredits
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();

  useEffect(
    () => {
      fetchEmployeeLeaveCredits();
    },
    //eslint-disable-next-line
    [employeeLeaveCreditsState.employee]
  );

  function addLeaveCredits() {}
  function editLeaveCredits() {}
  function deleteLeaveCredits() {}

  async function fetchEmployeeLeaveCredits() {
    setBusy(true);
    await getEmployeeLeaveCredits(employeeLeaveCreditsState.employee?.id!)
      .then((res) => {
        if (res) {
          dispatch(employeeLeaveCreditsActions.setEmployeeLeaveCredits(res));
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }

  function onModalClose() {
    dispatch(employeeLeaveCreditsActions.setShowModal(false));
  }
  return (
    <Modal
      onClose={onModalClose}
      className='employee-leave-credits-modal'
      title='Manage Employee Leave Credits'>
      <div className='modal-content-body employee-leave-credits-body'>
        <div className='btn-actions-group'>
          {hasAccess(
            userProfileState.moduleRights,
            Pages.EmployeeLeaveCredits,
            'Add',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button
              className='btn-action'
              title='Add'
              onClick={addLeaveCredits}>
              <FontAwesomeIcon icon={faAdd} />
              <span className='desktop-features'>Add</span>
            </button>
          )}
          {hasAccess(
            userProfileState.moduleRights,
            Pages.EmployeeLeaveCredits,
            'Edit',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button
              className='btn-action'
              disabled={!employeeLeaveCreditsState.selectedEmployeeLeaveCredits}
              onClick={editLeaveCredits}
              title='Edit'>
              <FontAwesomeIcon icon={faEdit} />
              <span className='desktop-features'>Edit</span>
            </button>
          )}
          {hasAccess(
            userProfileState.moduleRights,
            Pages.EmployeeLeaveCredits,
            'Delete',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button
              className='btn-action'
              disabled={!employeeLeaveCreditsState.selectedEmployeeLeaveCredits}
              onClick={deleteLeaveCredits}
              title='Delete'>
              <FontAwesomeIcon icon={faTrash} />
              <span className='desktop-features'>Delete</span>
            </button>
          )}
        </div>
        <div className='table-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Remaining Credits</th>
              </tr>
            </thead>
            <tbody>
              {employeeLeaveCreditsState.employeeLeaveCredits.map((leave) => (
                <tr>
                  <td>{leave.leaveType?.description}</td>
                  <td>{toCommaSeparateAmount(leave.credits.toString())}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
