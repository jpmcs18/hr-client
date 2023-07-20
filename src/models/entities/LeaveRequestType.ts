import LeaveType from './LeaveType';

export default interface LeaveRequestType {
  id: number;
  description: string | undefined;
  otherDescription: string | undefined;
  leaveTypeId: number | undefined;
  leaveType: LeaveType | undefined;
}
