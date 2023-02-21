import { UserEnd } from '../endpoints';
import SystemUser from '../entities/SystemUser';
import { httpGet, httpPut } from './base';

export async function saveProfile(
  username: string,
  password: string | null | undefined,
  newPassword: string | null | undefined
): Promise<boolean | undefined> {
  return await httpPut(UserEnd.SaveProfile, {
    username,
    password,
    newPassword,
  });
}

export async function getData(): Promise<SystemUser | undefined> {
  return await httpGet<SystemUser>(UserEnd.GetData);
}
