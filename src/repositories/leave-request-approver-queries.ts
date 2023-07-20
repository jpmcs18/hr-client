import { LeaveRequestApproverEnd } from '../endpoints';
import LeaveRequestApprover from '../models/entities/LeaveRequestApprover';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchLeaveRequestApprover(
  page: number
): Promise<SearchResult<LeaveRequestApprover> | undefined> {
  var query = '?page=' + page;

  return await httpGet<SearchResult<LeaveRequestApprover>>(
    LeaveRequestApproverEnd.Search + query
  );
}

export async function insertLeaveRequestApprover(
  leaveRequestApprover: LeaveRequestApprover
): Promise<LeaveRequestApprover | undefined> {
  return await httpPost<LeaveRequestApprover>(
    LeaveRequestApproverEnd.Insert,
    leaveRequestApprover
  );
}

export async function updateLeaveRequestApprover(
  leaveRequestApprover: LeaveRequestApprover
): Promise<boolean | undefined> {
  return await httpPut(
    LeaveRequestApproverEnd.Update + '/' + leaveRequestApprover.id,
    leaveRequestApprover
  );
}

export async function deleteLeaveRequestApprover(
  id: number
): Promise<boolean | undefined> {
  return await httpDelete(LeaveRequestApproverEnd.Delete + '/' + id);
}
