import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import ActivityLogItem from './activity-log-item';

export default function ActivityLogItems() {
  const dispatch = useDispatch();
  const activityLogState = useSelector((state: RootState) => state.activityLog);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee</th>
            <th>Log</th>
            <th>Module</th>
          </tr>
        </thead>
        <tbody>
          {activityLogState.activityLogs.map((activityLog) => (
            <tr key={activityLog.id}>
              <ActivityLogItem activityLog={activityLog} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
