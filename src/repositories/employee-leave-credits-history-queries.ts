import { EmployeeLeaveCreditsHistoryEnd } from '../endpoints';
import EmployeeLeaveCreditsHistory from '../models/entities/EmployeeLeaveCreditsHistory';
import SearchResult from '../models/response-model/SearchResult';
import { httpGet } from './base';

export async function searchEmployeeLeaveCreditsHistory(
  employeeId: number,
  leaveTypeId: number,
  page: number
): Promise<SearchResult<EmployeeLeaveCreditsHistory> | undefined> {
  var query =
    '?page=' +
    page +
    '&employeeId=' +
    employeeId +
    '&leaveTypeId=' +
    leaveTypeId;
  return await httpGet<SearchResult<EmployeeLeaveCreditsHistory>>(
    EmployeeLeaveCreditsHistoryEnd.Search + query
  );
}
