import ManageableInterface from './ManageableEntity';
import UserRole from './UserRole';

export default interface UserAccess extends ManageableInterface {
  id: number;
  userId: number | undefined;
  userRoleId: number | undefined;
  userRole: UserRole | undefined;
}
