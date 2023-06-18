export default interface LeaveRequest {
  id: number | undefined;
  employeeId: number | undefined;
  leaveTypeId: number | undefined;
  isWholeDay: boolean | undefined;
  isMultipleDays: boolean | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  totalLeaveCredits: number | undefined;
  remarks: string | undefined;
}
