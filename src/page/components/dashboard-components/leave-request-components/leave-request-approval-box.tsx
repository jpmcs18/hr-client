import { faTableCells } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../../custom-hooks/authorize-provider';
import {
  getLeaveRequestApprovalCount,
  getLeaveRequestRecommendationCount,
} from '../../../../repositories/leave-request-queries';
import { leaveApplicationApprovalModalActions } from '../../../../state/reducers/leave-application-appproval-modal-reducer';
import { leaveApplicationApprovalActions } from '../../../../state/reducers/leave-application-approval-reducer';
import { leaveRequestRecommendationModalActions } from '../../../../state/reducers/leave-request-recommendation-modal-reducer';
import { leaveRequestRecommendationActions } from '../../../../state/reducers/leave-request-recommendation-reducer';
import { RootState } from '../../../../state/store';
import ManageLeaveApplicationApproval from '../../../modals/manage-leave-application-approval';

export default function LeaveRequestApprovalBox() {
  const leaveApplicationApprovalState = useSelector(
    (state: RootState) => state.leaveApplicationApproval
  );
  const leaveApplicationApprovalModalState = useSelector(
    (state: RootState) => state.leaveApplicationApprovalModal
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();

  useEffect(
    () => {
      fetchPendingApplications();
    },
    //eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      if (leaveApplicationApprovalState.initiateSearch) {
        dispatch(leaveRequestRecommendationActions.setInitiateSearch(false));
        fetchPendingApplications();
      }
    },
    //eslint-disable-next-line
    [leaveApplicationApprovalState.initiateSearch]
  );
  async function fetchPendingApplications() {
    setBusy(true);
    await getLeaveRequestApprovalCount(
      userProfileState.systemUser?.employeeId ?? 0
    )
      .then((res) => {
        if (!!res) {
          dispatch(leaveApplicationApprovalActions.setApplicationCount(res));
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  return (
    <>
      <button
        className='box-container'
        onClick={() => {
          dispatch(leaveApplicationApprovalModalActions.setShowModal(true));
          dispatch(
            leaveApplicationApprovalModalActions.setEmployeeId(
              userProfileState.systemUser?.employeeId ?? 0
            )
          );
        }}>
        <div className='bubble'>
          <span>{leaveApplicationApprovalState.applicationCount}</span>
        </div>
        <FontAwesomeIcon className='icon' icon={faTableCells} />
        <label className='text'>Leave Applications For Approval</label>
      </button>
      {leaveApplicationApprovalModalState.isModalShow && (
        <ManageLeaveApplicationApproval />
      )}
    </>
  );
}
