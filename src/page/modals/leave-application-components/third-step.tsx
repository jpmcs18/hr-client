import { faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { LeaveRequestTypeDefaults } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { toDate } from '../../../helper';
import { insertLeaveRequest } from '../../../repositories/leave-request-queries';
import { leaveApplicationActions } from '../../../state/reducers/leave-application-reducer';
import { RootState } from '../../../state/store';
import CustomDisplay from '../../components/custom-display';

export default function ThirdStep() {
  const leaveApplicationState = useSelector(
    (state: RootState) => state.leaveApplication
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  function onClose() {
    dispatch(leaveApplicationActions.setShowModal(false));
  }
  async function saveData() {
    setBusy(true);
    await insertLeaveRequest(leaveApplicationState.leaveRequest)
      .then((res) => {
        if (res !== undefined) {
          setMessage({
            message: `Leave application submitted.\nApplication Reference No. ${res.referenceNo}`,
          });
          onClose();
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }

  return (
    <>
      <div className='modal-content-body leave-application-content-body'>
        <div className='summary-container'>
          <div className='summary'>
            <CustomDisplay
              title='TYPE OF LEAVE TO BE AVAILED OF'
              value={`${leaveApplicationState.leaveRequest.leaveRequestType?.description} (${leaveApplicationState.leaveRequest.leaveRequestType?.otherDescription})`}
            />
            <CustomDisplay
              title='NUMBER OF WORKING DAYS APPLIED FOR'
              value={leaveApplicationState.leaveRequest.totalLeaveCredits}
            />
            <CustomDisplay
              title='INCLUSIVE DATES'
              value={
                toDate(leaveApplicationState.leaveRequest.startDate) +
                (!leaveApplicationState.leaveRequest.isMultipleDays
                  ? ''
                  : ` - ${toDate(leaveApplicationState.leaveRequest.endDate)}`)
              }
            />
            {(+(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
              +LeaveRequestTypeDefaults.VacationLeave ||
              +(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
                +LeaveRequestTypeDefaults.SpecialPriviledgeLeave) &&
              (!!leaveApplicationState.leaveRequest.isLocal ? (
                <CustomDisplay
                  title='LEAVE DETAILS'
                  value={`Within the Philippines - ${leaveApplicationState.leaveRequest.location}`}
                />
              ) : (
                <CustomDisplay
                  title='LEAVE DETAILS'
                  value={`Abroad - ${leaveApplicationState.leaveRequest.location}`}
                />
              ))}
            {+(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
              +LeaveRequestTypeDefaults.SickLeave &&
              (!!leaveApplicationState.leaveRequest.isAdmitted ? (
                <CustomDisplay
                  title='LEAVE DETAILS'
                  value={`In Hospital - ${leaveApplicationState.leaveRequest.illness}`}
                />
              ) : (
                <CustomDisplay
                  title='LEAVE DETAILS'
                  value={`Out Patient - ${leaveApplicationState.leaveRequest.illness}`}
                />
              ))}
            {+(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
              +LeaveRequestTypeDefaults.SpecialLeaveBenefitforWomen && (
              <CustomDisplay
                title='LEAVE DETAILS'
                value={leaveApplicationState.leaveRequest.slbwIllness}
              />
            )}
            {+(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
              +LeaveRequestTypeDefaults.StudyLeave && (
              <>
                {!!leaveApplicationState.leaveRequest
                  .completionOfMatersDegree && (
                  <CustomDisplay
                    title='LEAVE DETAILS'
                    value="Completion of Master's Degree"
                  />
                )}
                {!!leaveApplicationState.leaveRequest.bar && (
                  <CustomDisplay
                    title='LEAVE DETAILS'
                    value='BAR/Board Examintation Review'
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button
            onClick={() => dispatch(leaveApplicationActions.setCurrentStep(2))}
            className='btn-action'>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className='desktop-features'>Back</span>
          </button>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faPaperPlane} />
            <span className='desktop-features'>Apply</span>
          </button>
        </div>
      </div>
    </>
  );
}
