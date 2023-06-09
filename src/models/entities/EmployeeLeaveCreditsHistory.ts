import LeaveType from './LeaveType';

export default interface EmployeeLeaveCreditsHistory {
  id: number;
  employeeId: number;
  date: Date;
  leaveTypeId: number;
  credits: number;
  source: string | undefined;

  leaveType: LeaveType | undefined;
}
