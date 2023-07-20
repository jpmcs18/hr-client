import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import LeaveRequestApprovalBox from './components/dashboard-components/leave-request-components/leave-request-approval-box';
import LeaveRequestBox from './components/dashboard-components/leave-request-components/leave-request-box';
import LeaveRequestRecommendationsBox from './components/dashboard-components/leave-request-components/leave-request-recommendations-box';
import LeaveRequestsBox from './components/dashboard-components/leave-request-components/leave-requests-box';

export default function Dashboard() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  return (
    <div className='dashboard-container'>
      <div className='requisition-container'>
        <LeaveRequestsBox />
        <LeaveRequestBox />
        {(userProfileState.systemUser?.isLeaveRequestApprover ||
          userProfileState.systemUser?.isLeaveRequestHeadApprover) && (
          <LeaveRequestRecommendationsBox />
        )}
        {userProfileState.systemUser?.isLeaveRequestFinalApprover && (
          <LeaveRequestApprovalBox />
        )}
      </div>
    </div>
  );
}
