import { LeaveRequestEnd } from '../endpoints';
import LeaveRequest from '../models/entities/LeaveRequest';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchEmployeeLeaveRequests(
  employeeId: number,
  page: number
): Promise<SearchResult<LeaveRequest> | undefined> {
  const query = `?employeeId=${employeeId}&page=${page}`;
  return await httpGet<SearchResult<LeaveRequest>>(
    LeaveRequestEnd.SearchEmployeeRequest + query
  );
}

export async function searchEmployeesLeaveRequests(
  officeId: number,
  page: number
): Promise<SearchResult<LeaveRequest> | undefined> {
  const query = `?officeId=${officeId}&page=${page}`;
  return await httpGet<SearchResult<LeaveRequest>>(
    LeaveRequestEnd.SearchEmployeeRequest + query
  );
}

export async function insertLeaveRequest(
  leaveRequest: LeaveRequest
): Promise<boolean | undefined> {
  return await httpPost<boolean>(LeaveRequestEnd.Insert, leaveRequest);
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

export async function approveLeaveRequest(
  id: number
): Promise<boolean | undefined> {
  return await httpPost<boolean>(LeaveRequestEnd.Approve, {
    id,
  });
}

export async function disapproveLeaveRequest(
  id: number,
  remarks: string | undefined
): Promise<boolean | undefined> {
  return await httpPost<boolean>(LeaveRequestEnd.Disapprove, { id, remarks });
}
