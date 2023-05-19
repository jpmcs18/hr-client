import { toDate } from '../../../helper';
import RequestHistory from '../../../models/entities/RequestHistory';

export default function RequestHistoryItem({
  requestHistory,
}: {
  requestHistory: RequestHistory;
}) {
  return (
    <>
      <td>{toDate(requestHistory.date)}</td>
      <td>{requestHistory.employee?.fullName}</td>
      <td>{requestHistory.requestType?.description}</td>
      <td>{requestHistory.purpose}</td>
      <td>{requestHistory.preparedBy?.fullName}</td>
    </>
  );
}
