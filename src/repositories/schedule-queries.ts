import { ScheduleEnd } from '../endpoints';
import Schedule from '../models/entities/Schedule';
import { httpGet } from './base';

export async function getSchedules(): Promise<Schedule[] | undefined> {
  return await httpGet<Schedule[]>(ScheduleEnd.GetList);
}
