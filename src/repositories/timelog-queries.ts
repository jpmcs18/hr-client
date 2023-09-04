import { TimeLogEnd } from '../endpoints';
import TimeLog from '../models/entities/TimeLog';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function getTimeLogs(): Promise<TimeLog[] | undefined> {
  return await httpGet<TimeLog[]>(TimeLogEnd.GetList);
}

export async function insertTimeLog(
  timelog: TimeLog
): Promise<TimeLog | undefined> {
  return await httpPost<TimeLog>(TimeLogEnd.Insert, timelog);
}

export async function updateTimeLog(
  timelog: TimeLog
): Promise<boolean | undefined> {
  return await httpPut(TimeLogEnd.Update + '/' + timelog.id, timelog);
}

export async function deleteTimeLog(id: number): Promise<boolean | undefined> {
  return await httpDelete(TimeLogEnd.Delete + '/' + id);
}
