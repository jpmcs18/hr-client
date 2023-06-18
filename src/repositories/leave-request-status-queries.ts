import { LeaveRequestStatusEnd } from '../endpoints';
import LeaveRequestStatus from '../models/entities/LeaveRequestStatus';
import { httpGet } from './base';

export async function getLeaveRequestStatuses(): Promise<
  LeaveRequestStatus[] | undefined
> {
  return await httpGet<LeaveRequestStatus[]>(LeaveRequestStatusEnd.GetList);
}
