import { useDispatch, useSelector } from 'react-redux';
import { systemUserActions } from '../../../state/reducers/system-user-reducer';
import { RootState } from '../../../state/store';
import SystemUserItem from './system-user-item';

export default function SystemUserItems() {
  const dispatch = useDispatch();
  const systemUserState = useSelector((state: RootState) => state.systemUser);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Employee</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {systemUserState.systemUsers.map((systemUser) => (
            <tr
              onClick={() =>
                dispatch(systemUserActions.setSelected(systemUser))
              }
              key={systemUser.id}
              className={
                systemUserState.selectedSystemUser?.id === systemUser.id
                  ? 'selected'
                  : ''
              }>
              <SystemUserItem systemUser={systemUser} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
