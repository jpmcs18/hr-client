import { faTableCells } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../../custom-hooks/authorize-provider';
import { getLeaveRequestRecommendationCount } from '../../../../repositories/leave-request-queries';
import { leaveRequestRecommendationModalActions } from '../../../../state/reducers/leave-request-recommendation-modal-reducer';
import { leaveRequestRecommendationActions } from '../../../../state/reducers/leave-request-recommendation-reducer';
import { RootState } from '../../../../state/store';
import ManageLeaveRequestRecommendation from '../../../modals/manage-leave-request-recommendation';

export default function LeaveRequestRecommendationsBox() {
  const leaveRequestRecommendationState = useSelector(
    (state: RootState) => state.leaveRequestRecommendation
  );
  const leaveRequestRecommendationModalState = useSelector(
    (state: RootState) => state.leaveRequestRecommendationModal
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
      if (leaveRequestRecommendationState.initiateSearch) {
        dispatch(leaveRequestRecommendationActions.setInitiateSearch(false));
        fetchPendingApplications();
      }
    },
    //eslint-disable-next-line
    [leaveRequestRecommendationState.initiateSearch]
  );
  async function fetchPendingApplications() {
    setBusy(true);
    await getLeaveRequestRecommendationCount(
      userProfileState.systemUser?.employeeId ?? 0
    )
      .then((res) => {
        if (!!res) {
          dispatch(leaveRequestRecommendationActions.setApplicationCount(res));
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
          dispatch(leaveRequestRecommendationModalActions.setShowModal(true));
          dispatch(
            leaveRequestRecommendationModalActions.setEmployeeId(
              userProfileState.systemUser?.employeeId ?? 0
            )
          );
        }}>
        <div className='bubble'>
          <span>{leaveRequestRecommendationState.applicationCount}</span>
        </div>
        <FontAwesomeIcon className='icon' icon={faTableCells} />
        <label className='text'>Leave Applications For Recommendation</label>
      </button>
      {leaveRequestRecommendationModalState.isModalShow && (
        <ManageLeaveRequestRecommendation />
      )}
    </>
  );
}
