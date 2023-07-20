import { useDispatch, useSelector } from 'react-redux';
import { leaveRequestActions } from '../../../state/reducers/leave-request-reducer';
import { RootState } from '../../../state/store';
import LeaveRequestItem from './leave-request-item';

export default function LeaveRequestItems() {
  const dispatch = useDispatch();
  const leaveRequestState = useSelector(
    (state: RootState) => state.leaveRequest
  );
  return (
    <div className='table-container leave-request-table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Reference No</th>
            <th>Employee</th>
            <th>Request Type</th>
            <th>Leave Type</th>
            <th>Inclusive Date</th>
            <th>Day/s</th>
            <th style={{ textAlign: 'center' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequestState.leaveRequests.map((leaveRequest) => (
            <tr
              onClick={() =>
                dispatch(
                  leaveRequestActions.setSelectedLeaveRequest(leaveRequest)
                )
              }
              key={leaveRequest.id}
              className={
                leaveRequestState.selectedLeaveRequest?.id === leaveRequest.id
                  ? 'selected'
                  : ''
              }>
              <LeaveRequestItem leaveRequest={leaveRequest} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
