import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import LeaveRequestType from '../../../models/entities/LeaveRequestType';
import { leaveApplicationActions } from '../../../state/reducers/leave-application-reducer';
import { RootState } from '../../../state/store';

export default function FirstStep() {
  const leaveApplicationState = useSelector(
    (state: RootState) => state.leaveApplication
  );
  const dispatch = useDispatch();
  function moveToNextStep(leaveRequestType: LeaveRequestType) {
    dispatch(leaveApplicationActions.setCurrentStep(2));
    dispatch(leaveApplicationActions.setLeaveRequestType(leaveRequestType));
  }
  return (
    <>
      <div className='modal-content-body leave-application-content-body'>
        <div className='leave-type-options'>
          {leaveApplicationState.leaveRequestTypes.map((leaveRequestType) => (
            <button
              className='btn-option'
              onClick={() =>
                moveToNextStep(leaveRequestType)
              }>{`${leaveRequestType.description} (${leaveRequestType.otherDescription})`}</button>
          ))}
        </div>
      </div>
      {!!leaveApplicationState.leaveRequest.leaveRequestTypeId && (
        <div className='modal-footer'>
          <div className='btn-actions-group'>
            <button
              onClick={() =>
                dispatch(leaveApplicationActions.setCurrentStep(2))
              }
              className='btn-action'>
              <FontAwesomeIcon icon={faChevronRight} />
              <span className='desktop-features'>Continue</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
