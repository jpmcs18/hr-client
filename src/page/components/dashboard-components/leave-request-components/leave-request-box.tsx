import { faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { leaveApplicationActions } from '../../../../state/reducers/leave-application-reducer';
import { RootState } from '../../../../state/store';
import LeaveApplicationModal from '../../../modals/leave-application-components/leave-application-modal';

export default function LeaveRequestBox() {
  const leaveApplicationState = useSelector(
    (state: RootState) => state.leaveApplication
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  return (
    <>
      <button
        className='box-container'
        onClick={() => {
          dispatch(leaveApplicationActions.setShowModal(true));
          dispatch(
            leaveApplicationActions.setEmployeeId(
              userProfileState.systemUser?.employeeId ?? 0
            )
          );
        }}>
        <FontAwesomeIcon className='icon' icon={faPersonWalkingLuggage} />
        <label className='text'>Apply for Leave</label>
      </button>
      {leaveApplicationState.isModalShow && <LeaveApplicationModal />}
    </>
  );
}
