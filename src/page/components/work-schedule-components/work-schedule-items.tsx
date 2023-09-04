import { useDispatch, useSelector } from 'react-redux';
import { workScheduleActions } from '../../../state/reducers/work-schedule-reducer';
import { RootState } from '../../../state/store';
import WorkScheduleItem from './work-schedule-item';

export default function WorkScheduleItems() {
  const dispatch = useDispatch();
  const workScheduleState = useSelector(
    (state: RootState) => state.workSchedule
  );
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Effectivity Date</th>
          </tr>
        </thead>
        <tbody>
          {workScheduleState.workSchedules.map((workSchedule) => (
            <tr
              onClick={() =>
                dispatch(workScheduleActions.setSelected(workSchedule))
              }
              key={workSchedule.id}
              className={
                workScheduleState.selectedWorkSchedule?.id === workSchedule.id
                  ? 'selected'
                  : ''
              }>
              <WorkScheduleItem workSchedule={workSchedule} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
