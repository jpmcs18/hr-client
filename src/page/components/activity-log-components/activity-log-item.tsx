import { toDate } from '../../../helper';
import ActivityLog from '../../../models/entities/ActivityLog';

export default function ActivityLogItem({
  activityLog,
}: {
  activityLog: ActivityLog;
}) {
  return (
    <>
      <td>{toDate(activityLog.date)}</td>
      <td>{activityLog.user?.employee?.fullName}</td>
      <td>{activityLog.log}</td>
      <td>{activityLog.table}</td>
    </>
  );
}
