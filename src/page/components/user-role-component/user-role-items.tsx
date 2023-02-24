import { useDispatch, useSelector } from 'react-redux';
import { userRoleActions } from '../../../state/reducers/user-role-reducer';
import { RootState } from '../../../state/store';
import UserRoleItem from './user-role-item';

export default function UserRoleItems() {
  const dispatch = useDispatch();
  const userRoleState = useSelector((state: RootState) => state.userRole);
  return (
    <section>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {userRoleState.userRoles.map((userRole) => (
            <tr
              onClick={() => dispatch(userRoleActions.setSelected(userRole))}
              key={userRole.id}
              className={
                userRoleState.selectedUserRole?.id === userRole.id
                  ? 'selected'
                  : ''
              }>
              <UserRoleItem userRole={userRole} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
