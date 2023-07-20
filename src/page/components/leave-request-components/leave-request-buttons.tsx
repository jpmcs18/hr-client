import {
  faAdd,
  faEdit,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { LeaveRequestStatusDefaults, Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteLeaveRequest } from '../../../repositories/leave-request-queries';
import { leaveRequestApprovalActions } from '../../../state/reducers/leave-request-approval-reducer';
import { leaveRequestDisapprovalActions } from '../../../state/reducers/leave-request-disapproval-reducer';
import { leaveRequestModalActions } from '../../../state/reducers/leave-request-modal-reducer';
import { leaveRequestActions } from '../../../state/reducers/leave-request-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function LeaveRequestButtons() {
  const leaveRequestState = useSelector(
    (state: RootState) => state.leaveRequest
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(leaveRequestActions.setSelectedLeaveRequest(undefined));
    dispatch(leaveRequestModalActions.setLeaveRequest());
    dispatch(leaveRequestModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(
      leaveRequestModalActions.setLeaveRequest(
        leaveRequestState.selectedLeaveRequest!
      )
    );
    dispatch(leaveRequestModalActions.setShowModal(true));
  }
  async function onDelete() {
    if (!leaveRequestState.selectedLeaveRequest?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteLeaveRequest(
          leaveRequestState.selectedLeaveRequest?.id ?? 0
        )
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected leave request deleted',
              });
              dispatch(leaveRequestActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .finally(() => setBusy(false));
      },
    });
  }
  function nextPage(page: number) {
    dispatch(leaveRequestActions.setCurrentPage(page));
    dispatch(leaveRequestActions.setInitiateSearch(true));
  }
  function onApprove() {
    dispatch(
      leaveRequestApprovalActions.setLeaveRequest(
        leaveRequestState.selectedLeaveRequest
      )
    );
    dispatch(
      leaveRequestApprovalActions.setTotalApproveCredits(
        leaveRequestState.selectedLeaveRequest?.totalLeaveCredits
      )
    );
    dispatch(leaveRequestApprovalActions.setShowModal(true));
  }
  function onDisapprove() {
    dispatch(
      leaveRequestDisapprovalActions.setLeaveRequest(
        leaveRequestState.selectedLeaveRequest
      )
    );
    dispatch(leaveRequestDisapprovalActions.setShowModal(true));
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.LeaveRequests,
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
          Pages.LeaveRequests,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={
              leaveRequestState.selectedLeaveRequest === undefined ||
              +(
                leaveRequestState.selectedLeaveRequest?.leaveRequestStatusId ??
                0
              ) !== +LeaveRequestStatusDefaults.Pending
            }
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.LeaveRequests,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={
              leaveRequestState.selectedLeaveRequest === undefined ||
              +(
                leaveRequestState.selectedLeaveRequest?.leaveRequestStatusId ??
                0
              ) !== +LeaveRequestStatusDefaults.Pending
            }
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.LeaveRequests,
          'Approve',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={
              leaveRequestState.selectedLeaveRequest === undefined ||
              +(
                leaveRequestState.selectedLeaveRequest?.leaveRequestStatusId ??
                0
              ) !== +LeaveRequestStatusDefaults.Pending
            }
            onClick={onApprove}
            title='Approve'>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span className='desktop-features'>Approve</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.LeaveRequests,
          'Disapprove',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={
              leaveRequestState.selectedLeaveRequest === undefined ||
              +(
                leaveRequestState.selectedLeaveRequest?.leaveRequestStatusId ??
                0
              ) !== +LeaveRequestStatusDefaults.Pending
            }
            onClick={onDisapprove}
            title='Disapprove'>
            <FontAwesomeIcon icon={faThumbsDown} />
            <span className='desktop-features'>Disapprove</span>
          </button>
        )}
      </div>
      <Pagination
        pages={leaveRequestState.pageCount}
        currentPageNumber={leaveRequestState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
