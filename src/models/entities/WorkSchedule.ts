import Schedule from './Schedule';

export default interface WorkSchedule {
  id: number;
  effectivityDate: Date | undefined;
  expiryDate: Date | undefined;
  sundayScheduleId: number | undefined;
  mondayScheduleId: number | undefined;
  tuesdayScheduleId: number | undefined;
  wednesdayScheduleId: number | undefined;
  thursdayScheduleId: number | undefined;
  fridayScheduleId: number | undefined;
  saturdayScheduleId: number | undefined;

  sundaySchedule?: Schedule | undefined;
  mondaySchedule?: Schedule | undefined;
  tuesdaySchedule?: Schedule | undefined;
  wednesdaySchedule?: Schedule | undefined;
  thursdaySchedule?: Schedule | undefined;
  fridaySchedule?: Schedule | undefined;
  saturdaySchedule?: Schedule | undefined;
}
