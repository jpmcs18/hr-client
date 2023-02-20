import { UserEnd } from '../endpoints';
import { httpPut } from './base';

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
