import { toDate } from '../../../helper';
import WorkSchedule from '../../../models/entities/WorkSchedule';

export default function WorkScheduleItem({
  workSchedule,
}: {
  workSchedule: WorkSchedule;
}) {
  return (
    <>
      <td>{workSchedule.sundaySchedule?.description ?? 'OFF'}</td>
      <td>{workSchedule.mondaySchedule?.description ?? 'OFF'}</td>
      <td>{workSchedule.tuesdaySchedule?.description ?? 'OFF'}</td>
      <td>{workSchedule.wednesdaySchedule?.description ?? 'OFF'}</td>
      <td>{workSchedule.thursdaySchedule?.description ?? 'OFF'}</td>
      <td>{workSchedule.fridaySchedule?.description ?? 'OFF'}</td>
      <td>{workSchedule.saturdaySchedule?.description ?? 'OFF'}</td>
      <td>
        {toDate(workSchedule.effectivityDate) +
          (workSchedule.expiryDate
            ? ` - ${toDate(workSchedule.expiryDate)}`
            : '')}
      </td>
    </>
  );
}
