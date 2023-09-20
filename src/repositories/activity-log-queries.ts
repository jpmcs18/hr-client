import { ActivityLogEnd } from '../endpoints';
import { dateToString, validateDate } from '../helper';
import ActivityLog from '../models/entities/ActivityLog';
import SearchResult from '../models/response-model/SearchResult';
import { httpGet } from './base';

export async function searchActivityLog(
  employeeId: number | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
  page: number
): Promise<SearchResult<ActivityLog> | undefined> {
  var query = '?page=' + page;

  if (validateDate(startDate)) {
    query += '&startDate=' + encodeURI(dateToString(startDate) ?? '');
  }

  if (validateDate(endDate)) {
    query += '&endDate=' + encodeURI(dateToString(endDate) ?? '');
  }

  if (!!employeeId) {
    query += '&employeeId=' + employeeId;
  }

  return await httpGet<SearchResult<ActivityLog>>(
    ActivityLogEnd.Search + query
  );
}
