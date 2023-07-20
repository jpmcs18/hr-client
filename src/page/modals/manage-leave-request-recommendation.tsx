import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LeaveRequestTypeDefaults } from '../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { toDate } from '../../helper';
import LeaveRequest from '../../models/entities/LeaveRequest';
import {
  getLeaveRequestsForRecommendation,
  recommendLeaveRequest,
} from '../../repositories/leave-request-queries';
import { leaveRequestDisapprovalActions } from '../../state/reducers/leave-request-disapproval-reducer';
import { leaveRequestRecommendationModalActions } from '../../state/reducers/leave-request-recommendation-modal-reducer';
import { leaveRequestRecommendationActions } from '../../state/reducers/leave-request-recommendation-reducer';
import { RootState } from '../../state/store';
import CustomDisplay from '../components/custom-display';
import ManageLeaveRequestDisapproval from './manage-leave-request-disapproval';
import Modal from './modal';

export default function ManageLeaveRequestRecommendation() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const leaveRequestRecommendationModalState = useSelector(
    (state: RootState) => state.leaveRequestRecommendationModal
  );
  const leaveRequestDisapprovalState = useSelector(
    (state: RootState) => state.leaveRequestDisapproval
  );
  useEffect(
    () => {
      fetchLeaveRequests();
    },
    //eslint-disable-next-line
    []
  );
  function onModalClose() {
    dispatch(leaveRequestRecommendationModalActions.setShowModal(false));
  }
  async function fetchLeaveRequests() {
    setBusy(true);
    await getLeaveRequestsForRecommendation(
      leaveRequestRecommendationModalState.employeeId ?? 0
    )
      .then((res) => {
        if (res) {
          dispatch(
            leaveRequestRecommendationModalActions.setLeaveRequests(res)
          );
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  function approve(leaveRequest: LeaveRequest) {
    setMessage({
      message: `Recommend application ${leaveRequest.referenceNo}?`,
      action: 'YESNO',
      onOk: () => {
        approveRequest(leaveRequest);
      },
    });
  }
  async function approveRequest(leaveRequest: LeaveRequest) {
    setBusy(true);
    await recommendLeaveRequest(leaveRequest.id)
      .then((res) => {
        if (res) {
          setToasterMessage({ content: 'Leave request recommended.' });
          fetchLeaveRequests();
          dispatch(leaveRequestRecommendationActions.setInitiateSearch(true));
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  function disapprove(leaveRequest: LeaveRequest) {
    dispatch(leaveRequestDisapprovalActions.setShowModal(true));
    dispatch(leaveRequestDisapprovalActions.setLeaveRequest(leaveRequest));
    dispatch(
      leaveRequestDisapprovalActions.setOnCloseFunction(fetchLeaveRequests)
    );
  }
  return (
    <Modal
      className='leave-request-recommendation-modal'
      onClose={onModalClose}
      title='Leave Applications for Recommendation'>
      <div className='modal-content-body leave-request-recommendation-body'>
        {leaveRequestRecommendationModalState.leaveRequests.map(
          (leaveRequest) => (
            <div
              key={leaveRequest.id}
              className='leave-request-recommendation-container'>
              <div className='leave-request-recommendation-details-container'>
                <div className='name'>{leaveRequest.employee?.fullName}</div>
                <div className='request-summary'>
                  <CustomDisplay
                    title='Reference no.'
                    value={leaveRequest.referenceNo}
                    isBold={true}
                  />
                  <CustomDisplay
                    title='Request date'
                    value={toDate(leaveRequest.requestDate)}
                  />
                  <CustomDisplay
                    title='Type of leave to be availed of'
                    value={`${leaveRequest.leaveRequestType?.description} (${leaveRequest.leaveRequestType?.otherDescription})`}
                  />
                  <CustomDisplay
                    title='Number of working days applied for'
                    value={leaveRequest.totalLeaveCredits}
                  />
                  <CustomDisplay
                    title='Inclusive dates'
                    value={
                      toDate(leaveRequest.startDate) +
                      (!leaveRequest.isMultipleDays
                        ? ''
                        : ` - ${toDate(leaveRequest.endDate)}`)
                    }
                  />
                  {(+(leaveRequest.leaveRequestTypeId ?? 0) ===
                    +LeaveRequestTypeDefaults.VacationLeave ||
                    +(leaveRequest.leaveRequestTypeId ?? 0) ===
                      +LeaveRequestTypeDefaults.SpecialPriviledgeLeave) &&
                    (!!leaveRequest.isLocal ? (
                      <CustomDisplay
                        title='Leave details'
                        value={`Within the Philippines - ${leaveRequest.location}`}
                      />
                    ) : (
                      <CustomDisplay
                        title='Leave details'
                        value={`Abroad - ${leaveRequest.location}`}
                      />
                    ))}
                  {+(leaveRequest.leaveRequestTypeId ?? 0) ===
                    +LeaveRequestTypeDefaults.SickLeave &&
                    (!!leaveRequest.isAdmitted ? (
                      <CustomDisplay
                        title='Leave details'
                        value={`In Hospital - ${leaveRequest.illness}`}
                      />
                    ) : (
                      <CustomDisplay
                        title='Leave details'
                        value={`Out Patient - ${leaveRequest.illness}`}
                      />
                    ))}
                  {+(leaveRequest.leaveRequestTypeId ?? 0) ===
                    +LeaveRequestTypeDefaults.SpecialLeaveBenefitforWomen && (
                    <CustomDisplay
                      title='Leave details'
                      value={leaveRequest.slbwIllness}
                    />
                  )}
                  {+(leaveRequest.leaveRequestTypeId ?? 0) ===
                    +LeaveRequestTypeDefaults.StudyLeave && (
                    <>
                      {!!leaveRequest.completionOfMatersDegree && (
                        <CustomDisplay
                          title='Leave details'
                          value="Completion of Master's Degree"
                        />
                      )}
                      {!!leaveRequest.bar && (
                        <CustomDisplay
                          title='Leave details'
                          value='BAR/Board Examintation Review'
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className='footer'>
                <button
                  className='btn-tool'
                  onClick={() => approve(leaveRequest)}>
                  <FontAwesomeIcon icon={faCheck} />
                  <span className='desktop-features'>Recommend</span>
                </button>
                <button
                  className='btn-tool'
                  onClick={() => disapprove(leaveRequest)}>
                  <FontAwesomeIcon icon={faClose} />
                  <span className='desktop-features'>Cancel</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
      {leaveRequestDisapprovalState.isModalShow && (
        <ManageLeaveRequestDisapproval />
      )}
    </Modal>
  );
}
