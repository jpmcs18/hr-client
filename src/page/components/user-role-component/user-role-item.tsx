import UserRole from '../../../models/entities/UserRole';

export default function UserRoleItem({ userRole }: { userRole: UserRole }) {
  return (
    <>
      <td>{userRole.description}</td>
    </>
  );
}
