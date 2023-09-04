import { useDispatch, useSelector } from 'react-redux';
import { toDateTime } from '../../../helper';
import { timelogActions } from '../../../state/reducers/timelog-reducer';
import { RootState } from '../../../state/store';

export default function TimeLogItems() {
  const dispatch = useDispatch();
  const timelogState = useSelector((state: RootState) => state.timelog);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Login</th>
            <th>Logout</th>
          </tr>
        </thead>
        <tbody>
          {timelogState.timelogs.map((timelog) => (
            <tr
              onClick={() =>
                dispatch(timelogActions.setSelectedTimeLog(timelog))
              }
              key={timelog.id}
              className={
                timelogState.selectedTimelog?.id === timelog.id
                  ? 'selected'
                  : ''
              }>
              <td>
                <div>{toDateTime(timelog.loginDate)}</div>
                <div className='subtitle'>{timelog.areaIn?.description}</div>
              </td>
              <td>
                <div>{toDateTime(timelog.logoutDate)}</div>
                <div className='subtitle'>{timelog.areaOut?.description}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
