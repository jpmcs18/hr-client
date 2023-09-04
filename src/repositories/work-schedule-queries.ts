import { WorkScheduleEnd } from '../endpoints';
import { dateToString, validateDate } from '../helper';
import WorkSchedule from '../models/entities/WorkSchedule';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchWorkSchedule(
  startDate: Date | undefined,
  endDate: Date | undefined,
  page: number
): Promise<SearchResult<WorkSchedule> | undefined> {
  var query = '?page=' + page;
  if (validateDate(startDate)) {
    query += '&startDate=' + encodeURI(dateToString(startDate) ?? '');
  }
  if (validateDate(endDate)) {
    query += '&endDate=' + encodeURI(dateToString(endDate) ?? '');
  }
  return await httpGet<SearchResult<WorkSchedule>>(
    WorkScheduleEnd.Search + query
  );
}

export async function insertWorkSchedule(
  workSchedule: WorkSchedule
): Promise<WorkSchedule | undefined> {
  return await httpPost<WorkSchedule>(WorkScheduleEnd.Insert, workSchedule);
}

export async function updateWorkSchedule(
  workSchedule: WorkSchedule
): Promise<boolean | undefined> {
  return await httpPut(
    WorkScheduleEnd.Update + '/' + workSchedule.id,
    workSchedule
  );
}

export async function deleteWorkSchedule(
  id: number
): Promise<boolean | undefined> {
  return await httpDelete(WorkScheduleEnd.Delete + '/' + id);
}
