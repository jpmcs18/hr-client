import LeaveRequestApprover from '../../../models/entities/LeaveRequestApprover';

export default function LeaveRequestApproverItem({
  leaveRequestApprover,
}: {
  leaveRequestApprover: LeaveRequestApprover;
}) {
  return (
    <>
      <td>{leaveRequestApprover.leaveRequestApproverType?.description}</td>
      <td>{leaveRequestApprover.approver?.fullName}</td>
    </>
  );
}
