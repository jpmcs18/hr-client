import { LeaveRequestTypeEnd } from '../endpoints';
import LeaveRequestType from '../models/entities/LeaveRequestType';
import { httpGet } from './base';

export async function getLeaveRequestTypes(): Promise<
  LeaveRequestType[] | undefined
> {
  return await httpGet<LeaveRequestType[]>(LeaveRequestTypeEnd.GetList);
}
