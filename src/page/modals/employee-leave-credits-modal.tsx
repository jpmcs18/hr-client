import {
  faAdd,
  faEdit,
  faHistory,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { hasAccess, toCommaSeparateAmount } from '../../helper';
import {
  deleteEmployeeLeaveCredits,
  getEmployeeLeaveCredits,
} from '../../repositories/employee-leave-credits-queries';
import { employeeLeaveCreditsHistoryModalActions } from '../../state/reducers/employee-leave-credits-history-modal-reducer';
import { employeeLeaveCreditsModalActions } from '../../state/reducers/employee-leave-credits-modal-reducer';
import { employeeLeaveCreditsActions } from '../../state/reducers/employee-leave-credits-reducer';
import { RootState } from '../../state/store';
import ManageEmployeeLeaveCredits from './manage-employee-leave-credits';
import Modal from './modal';
import EmployeeLeaveCreditsHistoryModal from './employee-leave-credits-history-modal';

export default function EmployeeLeaveCreditsModal() {
  const employeeLeaveCreditsState = useSelector(
    (state: RootState) => state.employeeLeaveCredits
  );
  const employeeLeaveCreditsModalState = useSelector(
    (state: RootState) => state.employeeLeaveCreditsModal
  );
  const employeeLeaveCreditsHistoryModalState = useSelector(
    (state: RootState) => state.employeeLeaveCreditsHistoryModal
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();

  useEffect(
    () => {
      if (employeeLeaveCreditsState.initiateSearch) {
        fetchEmployeeLeaveCredits();
      }
    },
    //eslint-disable-next-line
    [employeeLeaveCreditsState.initiateSearch]
  );

  function addLeaveCredits() {
    dispatch(
      employeeLeaveCreditsModalActions.setEmployee(
        employeeLeaveCreditsState.employee
      )
    );
    dispatch(
      employeeLeaveCreditsModalActions.setEmployeeLeaveCredits(undefined)
    );
    dispatch(employeeLeaveCreditsModalActions.setShowModal(true));
  }
  function editLeaveCredits() {
    dispatch(
      employeeLeaveCreditsModalActions.setEmployee(
        employeeLeaveCreditsState.employee
      )
    );
    dispatch(
      employeeLeaveCreditsModalActions.setEmployeeLeaveCredits(
        employeeLeaveCreditsState.selectedEmployeeLeaveCredits
      )
    );
    dispatch(employeeLeaveCreditsModalActions.setShowModal(true));
  }
  function deleteLeaveCredits() {
    if (!employeeLeaveCreditsState.selectedEmployeeLeaveCredits?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteEmployeeLeaveCredits(
          employeeLeaveCreditsState.selectedEmployeeLeaveCredits?.id ?? 0
        )
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected leave credit deleted',
              });
              dispatch(employeeLeaveCreditsActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .finally(() => setBusy(false));
      },
    });
  }

  async function fetchEmployeeLeaveCredits() {
    dispatch(employeeLeaveCreditsActions.setInitiateSearch(false));
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
  function leaveCreditsHistory() {
    dispatch(
      employeeLeaveCreditsHistoryModalActions.setEmployeeLeaveCredits(
        employeeLeaveCreditsState.selectedEmployeeLeaveCredits
      )
    );
    dispatch(employeeLeaveCreditsHistoryModalActions.setShowModal(true));
    dispatch(employeeLeaveCreditsHistoryModalActions.setInitiateSearch(true));
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
            'History',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button
              className='btn-action'
              disabled={!employeeLeaveCreditsState.selectedEmployeeLeaveCredits}
              onClick={leaveCreditsHistory}
              title='History'>
              <FontAwesomeIcon icon={faHistory} />
              <span className='desktop-features'>History</span>
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
                <tr
                  key={leave.id}
                  className={
                    employeeLeaveCreditsState.selectedEmployeeLeaveCredits
                      ?.id === leave.id
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    dispatch(
                      employeeLeaveCreditsActions.setSelectedEmployeeLeaveCredits(
                        leave
                      )
                    )
                  }>
                  <td>{leave.leaveType?.description}</td>
                  <td>{toCommaSeparateAmount(leave.credits?.toString())}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <>
        {employeeLeaveCreditsModalState.isModalShow && (
          <ManageEmployeeLeaveCredits />
        )}
        {employeeLeaveCreditsHistoryModalState.isModalShow && (
          <EmployeeLeaveCreditsHistoryModal />
        )}
      </>
    </Modal>
  );
}
