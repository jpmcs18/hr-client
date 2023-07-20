import { LeaveRequestEnd } from '../endpoints';
import { dateToString, validateDate } from '../helper';
import LeaveRequest from '../models/entities/LeaveRequest';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchLeaveRequests(
  key: string | undefined,
  requestStatusId: number | undefined,
  requestTypeId: number | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
  page: number
): Promise<SearchResult<LeaveRequest> | undefined> {
  let query = `?page=${page}`;
  if (key) {
    query += `&key=${encodeURIComponent(key)}`;
  }
  if (requestStatusId !== undefined) {
    query += `&requestStatusId=${requestStatusId}`;
  }
  if (requestTypeId !== undefined) {
    query += `&requestTypeId=${requestTypeId}`;
  }
  if (validateDate(startDate)) {
    query += '&startDate=' + encodeURI(dateToString(startDate) ?? '');
  }
  if (validateDate(endDate)) {
    query += '&endDate=' + encodeURI(dateToString(endDate) ?? '');
  }
  return await httpGet<SearchResult<LeaveRequest>>(
    LeaveRequestEnd.SearchRequest + query
  );
}

export async function searchEmployeeLeaveRequests(
  employeeId: number,
  key: string | undefined,
  requestStatusId: number | undefined,
  requestTypeId: number | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
  page: number
): Promise<SearchResult<LeaveRequest> | undefined> {
  let query = `?employeeId=${employeeId}&page=${page}`;
  if (!!key) {
    query += `&key=${encodeURIComponent(key)}`;
  }
  if (requestStatusId !== undefined) {
    query += `&requestStatusId=${requestStatusId}`;
  }
  if (requestTypeId !== undefined) {
    query += `&requestTypeId=${requestTypeId}`;
  }
  if (validateDate(startDate)) {
    query += '&startDate=' + encodeURI(dateToString(startDate) ?? '');
  }
  if (validateDate(endDate)) {
    query += '&endDate=' + encodeURI(dateToString(endDate) ?? '');
  }
  return await httpGet<SearchResult<LeaveRequest>>(
    LeaveRequestEnd.SearchEmployeeRequest + query
  );
}

export async function searchEmployeesLeaveRequests(
  officeId: number,
  requestStatusId: number | undefined,
  requestTypeId: number | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
  page: number
): Promise<SearchResult<LeaveRequest> | undefined> {
  let query = `?officeId=${officeId}&page=${page}`;
  if (requestStatusId !== undefined) {
    query += `&requestStatusId=${requestStatusId}`;
  }
  if (requestTypeId !== undefined) {
    query += `&requestTypeId=${requestTypeId}`;
  }
  if (validateDate(startDate)) {
    query += '&startDate=' + encodeURI(dateToString(startDate) ?? '');
  }
  if (validateDate(endDate)) {
    query += '&endDate=' + encodeURI(dateToString(endDate) ?? '');
  }
  return await httpGet<SearchResult<LeaveRequest>>(
    LeaveRequestEnd.SearchEmployeesRequest + query
  );
}

export async function insertLeaveRequest(
  leaveRequest: LeaveRequest
): Promise<LeaveRequest | undefined> {
  return await httpPost<LeaveRequest>(LeaveRequestEnd.Insert, leaveRequest);
}

export async function updateLeaveRequest(
  leaveRequest: LeaveRequest
): Promise<boolean> {
  return await httpPut(
    LeaveRequestEnd.Insert + '/' + leaveRequest.id,
    leaveRequest
  );
}

export async function deleteLeaveRequest(id: number): Promise<boolean> {
  return await httpDelete(LeaveRequestEnd.Delete + '/' + id);
}

export async function recommendLeaveRequest(
  id: number
): Promise<boolean | undefined> {
  return await httpPost<boolean>(LeaveRequestEnd.Recommend, { id });
}

export async function approveLeaveRequest(
  id: number,
  totalApprovedLeaveCredits: number
): Promise<boolean | undefined> {
  return await httpPost<boolean>(LeaveRequestEnd.Approve, {
    id,
    totalApprovedLeaveCredits,
  });
}

export async function disapproveLeaveRequest(
  id: number,
  isFinal: boolean,
  remarks: string | undefined
): Promise<boolean | undefined> {
  return await httpPost<boolean>(LeaveRequestEnd.Disapprove, {
    id,
    isFinal,
    remarks,
  });
}

export async function getLeaveRequestRecommendationCount(
  approverId: number
): Promise<number | undefined> {
  return await httpGet<number>(
    LeaveRequestEnd.RecommendationCount + '/' + approverId
  );
}

export async function getLeaveRequestsForRecommendation(
  approverId: number
): Promise<LeaveRequest[] | undefined> {
  return await httpGet<LeaveRequest[]>(
    LeaveRequestEnd.Recommendation + '/' + approverId
  );
}

export async function getLeaveRequestApprovalCount(
  approverId: number
): Promise<number | undefined> {
  return await httpGet<number>(
    LeaveRequestEnd.ApprovalCount + '/' + approverId
  );
}

export async function getLeaveRequestsForApproval(
  approverId: number
): Promise<LeaveRequest[] | undefined> {
  return await httpGet<LeaveRequest[]>(
    LeaveRequestEnd.Approval + '/' + approverId
  );
}
