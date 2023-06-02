import { LeaveTypeEnd } from '../endpoints';
import LeaveType from '../models/entities/LeaveType';
import { httpGet } from './base';

export async function getLeaveTypes(): Promise<LeaveType[] | undefined> {
  return await httpGet<LeaveType[]>(LeaveTypeEnd.GetList);
}
