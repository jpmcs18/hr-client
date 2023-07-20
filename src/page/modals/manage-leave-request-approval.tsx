import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { toCommaSeparateAmount, toDate } from '../../helper';
import { approveLeaveRequest } from '../../repositories/leave-request-queries';
import { leaveRequestApprovalActions } from '../../state/reducers/leave-request-approval-reducer';
import { leaveRequestActions } from '../../state/reducers/leave-request-reducer';
import { RootState } from '../../state/store';
import CustomDisplay from '../components/custom-display';
import CustomNumber from '../components/custom-number';
import Modal from './modal';

export default function ManageLeaveRequestApproval() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const leaveRequestApprovalState = useSelector(
    (state: RootState) => state.leaveRequestApproval
  );
  function onModalClose(hasChange: boolean) {
    dispatch(leaveRequestApprovalActions.setShowModal(false));
    if (hasChange) {
      dispatch(leaveRequestActions.setInitiateSearch(true));
      leaveRequestApprovalState.onCloseFunction?.();
    }
  }

  async function approve() {
    console.log(leaveRequestApprovalState.totalApproveCredits);
    if ((leaveRequestApprovalState.totalApproveCredits ?? 0) <= 0) {
      setToasterMessage({ content: 'Invalid approved leave credits' });
      return;
    }
    setBusy(true);
    await approveLeaveRequest(
      leaveRequestApprovalState.leaveRequest?.id ?? 0,
      leaveRequestApprovalState.totalApproveCredits ?? 0
    )
      .then((res) => {
        if (res) {
          setToasterMessage({ content: 'Leave request approved.' });
          onModalClose(true);
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  return (
    <Modal
      className='leave-request-approval-modal'
      onClose={() => onModalClose(false)}
      title='Leave Request Approval'>
      <div className='modal-content-body'>
        <CustomDisplay
          title='NUMBER OF WORKING DAYS APPLIED FOR'
          value={toCommaSeparateAmount(
            leaveRequestApprovalState.leaveRequest?.totalLeaveCredits?.toString()
          )}
        />
        <CustomDisplay
          title='INCLUSIVE DATES'
          value={
            toDate(leaveRequestApprovalState.leaveRequest?.startDate) +
            (!leaveRequestApprovalState.leaveRequest?.isMultipleDays
              ? ''
              : ` - ${toDate(leaveRequestApprovalState.leaveRequest?.endDate)}`)
          }
        />
        <CustomNumber
          title='Total approved leave credits'
          type='number'
          min={0}
          max={leaveRequestApprovalState.leaveRequest?.totalLeaveCredits}
          value={leaveRequestApprovalState.totalApproveCredits}
          onChange={(ret) =>
            dispatch(
              leaveRequestApprovalActions.setTotalApproveCredits(ret.value)
            )
          }
        />
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={approve} className='btn-action'>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span className='desktop-features'>Approve</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
