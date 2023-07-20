import Employee from './Employee';
import LeaveRequestStatus from './LeaveRequestStatus';
import LeaveRequestType from './LeaveRequestType';
import SystemUser from './SystemUser';

export default interface LeaveRequest {
  id: number;
  referenceNo?: string | undefined;
  employeeId: number | undefined;
  requestDate: Date | undefined;
  leaveRequestTypeId: number | undefined;
  isWholeDay: boolean | undefined;
  isMultipleDays: boolean | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  totalLeaveCredits: number | undefined;
  leaveRequestStatusId: number | undefined;

  isLocal?: boolean | undefined;
  location?: string | undefined;
  isAdmitted?: boolean | undefined;
  illness?: string | undefined;
  slbwIllness?: string | undefined;
  completionOfMatersDegree?: boolean | undefined;
  bar?: boolean | undefined;

  isRequested?: boolean | undefined;

  approvedBy?: SystemUser | undefined;
  approvedOn?: Date | undefined;
  totalApprovedLeaveCredits?: number | undefined;

  disapprovedBy?: SystemUser | undefined;
  disapprovedOn?: Date | undefined;
  disapprovedRemarks?: string | undefined;

  leaveRequestType?: LeaveRequestType | undefined;
  employee?: Employee | undefined;
  leaveRequestStatus?: LeaveRequestStatus | undefined;
}
