import SystemUser from '../../../models/entities/SystemUser';

export default function SystemUserItem({
  systemUser,
}: {
  systemUser: SystemUser;
}) {
  return (
    <>
      <td>{systemUser.username}</td>
      <td>{systemUser.displayName}</td>
      <td>{systemUser.isAdmin ? 'Administrator' : 'User'}</td>
    </>
  );
}
