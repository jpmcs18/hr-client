import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteLeaveRequestApprover } from '../../../repositories/leave-request-approver-queries';
import { leaveRequestApproverModalActions } from '../../../state/reducers/leave-request-approver-modal-reducer';
import { leaveRequestApproverActions } from '../../../state/reducers/leave-request-approver-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function LeaveRequestApproverButtons() {
  const dispatch = useDispatch();
  const leaveRequestApproverState = useSelector(
    (state: RootState) => state.leaveRequestApprover
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(leaveRequestApproverActions.setSelected(undefined));
    dispatch(leaveRequestApproverModalActions.setLeaveRequestApprover());
    dispatch(leaveRequestApproverModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(
      leaveRequestApproverModalActions.setLeaveRequestApprover(
        leaveRequestApproverState.selectedLeaveRequestApprover!
      )
    );
    dispatch(leaveRequestApproverModalActions.setShowModal(true));
  }
  async function nextPage(page: number) {
    dispatch(leaveRequestApproverActions.setCurrentPage(page));
    dispatch(leaveRequestApproverActions.setInitiateSearch(true));
  }
  async function onDelete() {
    if (!leaveRequestApproverState.selectedLeaveRequestApprover?.id) return;

    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteLeaveRequestApprover(
          leaveRequestApproverState.selectedLeaveRequestApprover?.id ?? 0
        )
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected approver deleted',
              });
              dispatch(leaveRequestApproverActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .finally(() => setBusy(false));
      },
    });
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.LeaveRequestApprovers,
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
          Pages.LeaveRequestApprovers,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!leaveRequestApproverState.selectedLeaveRequestApprover}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.LeaveRequestApprovers,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!leaveRequestApproverState.selectedLeaveRequestApprover}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>

      <Pagination
        pages={leaveRequestApproverState.pageCount}
        currentPageNumber={leaveRequestApproverState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
