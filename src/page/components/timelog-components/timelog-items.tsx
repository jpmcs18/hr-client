import { useDispatch, useSelector } from 'react-redux';
import { toDate, toDateTime } from '../../../helper';
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
            <th>Area</th>
            <th>Logout</th>
            <th>Area</th>
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
              <td>{toDateTime(timelog.loginDate)}</td>
              <td>{timelog.areaIn?.description}</td>
              <td>{toDateTime(timelog.logoutDate)}</td>
              <td>{timelog.areaOut?.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
