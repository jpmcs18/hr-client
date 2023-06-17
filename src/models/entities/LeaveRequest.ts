export default interface LeaveRequest {
  id: number | undefined;
  employeeId: number | undefined;
  leaveTypeId: number | undefined;
  isWholeDay: boolean | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  totalLeaveCreditsToUse: number | undefined;
  remarks: string | undefined;
}
