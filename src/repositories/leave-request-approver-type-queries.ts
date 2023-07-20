import { LeaveRequestApproverTypeEnd } from '../endpoints';
import LeaveRequestApproverType from '../models/entities/LeaveRequestApproverType';
import { httpGet } from './base';

export async function getLeaveRequestApproverTypes(): Promise<
  LeaveRequestApproverType[] | undefined
> {
  return await httpGet<LeaveRequestApproverType[]>(
    LeaveRequestApproverTypeEnd.GetList
  );
}
