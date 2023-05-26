import LeaveType from './LeaveType';

export default interface EmployeeLeaveCredits {
  id: number;
  employeeId: number;
  leaveTypeId: number;
  credits: number;

  leaveType?: LeaveType | undefined;
}
