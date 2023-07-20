import Employee from './Employee';
import LeaveRequestApproverType from './LeaveRequestApproverType';

export default interface LeaveRequestApprover {
  id: number;
  approverId: number | undefined;
  leaveRequestApproverTypeId: number | undefined;
  leaveRequestApproverType?: LeaveRequestApproverType | undefined;
  approver?: Employee | undefined;
}
