import LeaveType from './LeaveType';

export default interface EmployeeLeaveCredits {
  id: number;
  employeeId: number | undefined;
  leaveTypeId: number | undefined;
  credits: number | undefined;

  leaveType?: LeaveType | undefined;
}
