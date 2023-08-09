import Employee from './Employee';
import UserAccess from './UserAccess';

export default interface SystemUser {
  id: number;
  username: string | undefined;
  isActive: boolean;
  isAdmin: boolean;
  displayName: string;
  employeeId: number | undefined;
  employee: Employee | undefined;
  userAccesses: UserAccess[] | undefined;
  allow2FA: boolean | undefined;
  mobileNumber: string | undefined;
  isLeaveRequestApprover?: boolean | undefined;
  isLeaveRequestHeadApprover?: boolean | undefined;
  isLeaveRequestFinalApprover?: boolean | undefined;
}
