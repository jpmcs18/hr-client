import { ActivityLogEnd } from '../endpoints';
import { dateToString, validateDate } from '../helper';
import ActivityLog from '../models/entities/ActivityLog';
import SearchResult from '../models/response-model/SearchResult';
import { httpGet } from './base';

export async function searchActivityLog(
  startDate: Date | undefined,
  endDate: Date | undefined,
  employeeId: number | undefined,
  page: number
): Promise<SearchResult<ActivityLog> | undefined> {
  var query = '?page=' + page;
  if (!!employeeId) {
    query += '&employeeId=' + encodeURIComponent(employeeId);
  }
  if (validateDate(startDate)) {
    query += '&startDate=' + encodeURI(dateToString(startDate) ?? '');
  }
  if (validateDate(endDate)) {
    query += '&startDate=' + encodeURI(dateToString(endDate) ?? '');
  }
  return await httpGet<SearchResult<ActivityLog>>(
    ActivityLogEnd.Search + query
  );
}
