import { TimeLogEnd } from '../endpoints';
import { dateToString } from '../helper';
import TimeLog from '../models/entities/TimeLog';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function getTimeLogs(
  employeeId: number,
  startDate: Date,
  endDate: Date
): Promise<TimeLog[] | undefined> {
  var query =
    '?employeeId=' +
    employeeId +
    '&startDate=' +
    encodeURI(dateToString(startDate) ?? '') +
    '&endDate=' +
    encodeURI(dateToString(endDate) ?? '');
  return await httpGet<TimeLog[]>(TimeLogEnd.GetList + query);
}

export async function insertTimeLog(
  timelog: TimeLog
): Promise<TimeLog | undefined> {
  console.log(timelog);
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

export async function generateActualTimeLogs(
  employeeId: number,
  startDate: Date,
  endDate: Date
): Promise<string | undefined> {
  var query =
    '?employeeId=' +
    employeeId +
    '&startDate=' +
    encodeURI(dateToString(startDate) ?? '') +
    '&endDate=' +
    encodeURI(dateToString(endDate) ?? '');
  return await httpGet<string>(TimeLogEnd.ActualTimeLog + query);
}

export async function generateDTR(
  exportOption: string,
  fileSegregation: string,
  officeId: number | undefined,
  employeeId: number | undefined,
  startDate: Date,
  endDate: Date
): Promise<string | undefined> {
  var query =
    '?exportOption=' +
    exportOption +
    '&fileSegregation=' +
    fileSegregation +
    '&startDate=' +
    encodeURI(dateToString(startDate) ?? '') +
    '&endDate=' +
    encodeURI(dateToString(endDate) ?? '');

  if (!!officeId) {
    query += '&officeId=' + officeId;
  }
  if (!!employeeId) {
    query += '&selectedOfficeId=' + employeeId;
  }
  return await httpGet<string>(TimeLogEnd.DTR + query);
}
