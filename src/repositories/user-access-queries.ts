import { UserAccessEnd } from '../endpoints';
import SystemUser from '../entities/SystemUser';
import UserAccess from '../entities/UserAccess';
import { httpGet } from './base';

export async function getUserAccesses(
  userId: number
): Promise<UserAccess[] | undefined> {
  return await httpGet<UserAccess[]>(
    UserAccessEnd.GetListByUser + '/' + userId
  );
}
