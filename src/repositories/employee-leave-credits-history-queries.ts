import { EmployeeLeaveCreditsHistoryEnd } from '../endpoints';
import RequestHistory from '../models/entities/RequestHistory';
import SearchResult from '../models/response-model/SearchResult';
import { httpGet } from './base';

export async function searchEmployeeLeaveCreditsHistory(
  employeeId: number,
  page: number
): Promise<SearchResult<RequestHistory> | undefined> {
  var query = '?page=' + page + '&employee=' + employeeId;
  return await httpGet<SearchResult<RequestHistory>>(
    EmployeeLeaveCreditsHistoryEnd.Search + query
  );
}
