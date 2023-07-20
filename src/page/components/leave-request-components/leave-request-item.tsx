import { LeaveRequestStatusDefaults } from '../../../constant';
import { toCommaSeparateAmount, toDate } from '../../../helper';
import LeaveRequest from '../../../models/entities/LeaveRequest';
import CustomDisplay from '../custom-display';

export default function LeaveRequestItem({
  leaveRequest,
}: {
  leaveRequest: LeaveRequest;
}) {
  return (
    <>
      <td>{toDate(leaveRequest.requestDate)}</td>
      <td>{leaveRequest.referenceNo}</td>
      <td>{leaveRequest.employee?.fullName}</td>
      <td>{leaveRequest.leaveRequestType?.description}</td>
      <td>{leaveRequest.leaveRequestType?.leaveType?.description}</td>
      <td>
        {toDate(leaveRequest.startDate) +
          (!leaveRequest.isMultipleDays
            ? ''
            : ` - ${toDate(leaveRequest.endDate)}`)}
      </td>
      <td>
        {toCommaSeparateAmount(leaveRequest.totalLeaveCredits?.toString())}
      </td>
      <td style={{ textAlign: 'center' }}>
        <span
          className={
            leaveRequest.leaveRequestStatus?.description?.toLowerCase() +
            ' leave-status'
          }>
          {leaveRequest.leaveRequestStatus?.description}
        </span>
      </td>
    </>
  );
}
