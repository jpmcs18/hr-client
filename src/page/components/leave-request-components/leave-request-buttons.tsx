import {
  faAdd,
  faEdit,
  faFileArrowUp,
  faHistory,
  faLevelUp,
  faPersonWalkingLuggage,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteEmployee } from '../../../repositories/employee-queries';
import { employeeAttachmentModalActions } from '../../../state/reducers/employee-attachment-modal-reducer';
import { employeeHistoryModalActions } from '../../../state/reducers/employee-history-modal-reducer';
import { employeeLeaveCreditsActions } from '../../../state/reducers/employee-leave-credits-reducer';
import { employeeModalActions } from '../../../state/reducers/employee-modal-reducer';
import { employeePromotionActions } from '../../../state/reducers/employee-promotion-reducer';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function LeaveRequestButtons() {
  const employeeState = useSelector((state: RootState) => state.employee);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(employeeActions.setSelected(undefined));
    dispatch(employeeModalActions.setEmployee());
    dispatch(employeeModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(employeeModalActions.setEmployee(employeeState.selectedEmployee!));
    dispatch(employeeModalActions.setShowModal(true));
  }
  function attach() {
    dispatch(
      employeeAttachmentModalActions.setEmployee(
        employeeState.selectedEmployee!
      )
    );
    dispatch(employeeAttachmentModalActions.setShowModal(true));
    dispatch(employeeAttachmentModalActions.setInitiateSearch(true));
  }
  async function onDelete() {
    if (!employeeState.selectedEmployee?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteEmployee(employeeState.selectedEmployee?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected employee has been deleted',
              });
              dispatch(employeeActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .finally(() => setBusy(false));
      },
    });
  }
  function history() {
    dispatch(
      employeeHistoryModalActions.setEmployee(employeeState.selectedEmployee)
    );
    dispatch(employeeHistoryModalActions.setShowModal(true));
  }
  function nextPage(page: number) {
    dispatch(employeeActions.setCurrentPage(page));
    dispatch(employeeActions.setInitiateSearch(true));
  }
  function promote() {
    dispatch(
      employeePromotionActions.setEmployee(employeeState.selectedEmployee!)
    );
    dispatch(employeePromotionActions.setShowModal(true));
  }
  function leave() {
    dispatch(
      employeeLeaveCreditsActions.setEmployee(employeeState.selectedEmployee!)
    );
    dispatch(employeeLeaveCreditsActions.setShowModal(true));
    dispatch(employeeLeaveCreditsActions.setInitiateSearch(true));
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Employees,
          'Add',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button className='btn-action' title='Add' onClick={add}>
            <FontAwesomeIcon icon={faAdd} />
            <span className='desktop-features'>Add</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Employees,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!employeeState.selectedEmployee}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Employees,
          'Promote',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!employeeState.selectedEmployee}
            onClick={promote}
            title='Promote'>
            <FontAwesomeIcon icon={faLevelUp} />
            <span className='desktop-features'>Promote</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Employees,
          'Attachments',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!employeeState.selectedEmployee}
            onClick={attach}
            title='Attachments'>
            <FontAwesomeIcon icon={faFileArrowUp} />
            <span className='desktop-features'>Attachments</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Employees,
          'Leave Credits',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!employeeState.selectedEmployee}
            onClick={leave}
            title='Leave Credits'>
            <FontAwesomeIcon icon={faPersonWalkingLuggage} />
            <span className='desktop-features'>Leave Credits</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Employees,
          'History',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!employeeState.selectedEmployee}
            onClick={history}
            title='History'>
            <FontAwesomeIcon icon={faHistory} />
            <span className='desktop-features'>History</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Employees,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!employeeState.selectedEmployee}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>

      <Pagination
        pages={employeeState.pageCount}
        currentPageNumber={employeeState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
