import { useDispatch, useSelector } from 'react-redux';
import { leaveRequestApproverActions } from '../../../state/reducers/leave-request-approver-reducer';
import { RootState } from '../../../state/store';
import LeaveRequestApproverItem from './leave-request-approver-item';

export default function LeaveRequestApproverItems() {
  const dispatch = useDispatch();
  const leaveRequestApproverState = useSelector(
    (state: RootState) => state.leaveRequestApprover
  );
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Approver Type</th>
            <th>Approver</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequestApproverState.leaveRequestApprovers.map(
            (leaveRequestApprover) => (
              <tr
                onClick={() =>
                  dispatch(
                    leaveRequestApproverActions.setSelected(
                      leaveRequestApprover
                    )
                  )
                }
                key={leaveRequestApprover.id}
                className={
                  leaveRequestApproverState.selectedLeaveRequestApprover?.id ===
                  leaveRequestApprover.id
                    ? 'selected'
                    : ''
                }>
                <LeaveRequestApproverItem
                  leaveRequestApprover={leaveRequestApprover}
                />
              </tr>
            )
          )}
        </tbody>
      </table>
    </section>
  );
}
