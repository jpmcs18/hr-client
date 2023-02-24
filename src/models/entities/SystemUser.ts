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
}
