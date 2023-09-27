import { toDate, toDateTime } from '../../../helper';
import ActivityLog from '../../../models/entities/ActivityLog';

export default function RequestHistoryItem({
  activityLog,
}: {
  activityLog: ActivityLog;
}) {
  return (
    <>
      <td>{toDateTime(activityLog.date)}</td>
      <td>{activityLog.user?.employee?.fullName}</td>
      <td>{activityLog.log}</td>
      <td>{activityLog.table}</td>
    </>
  );
}
