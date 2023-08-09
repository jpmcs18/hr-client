import { SystemUserEnd } from '../endpoints';
import SystemUser from '../models/entities/SystemUser';
import UpdateUserProfile from '../models/request-model/UpdateProfile';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function saveProfile(
  user: UpdateUserProfile
): Promise<boolean | undefined> {
  return await httpPost(SystemUserEnd.SaveProfile, user);
}

export async function getData(): Promise<SystemUser | undefined> {
  return await httpGet<SystemUser>(SystemUserEnd.GetData);
}

export async function searchSystemUser(
  key: string,
  page: number
): Promise<SearchResult<SystemUser> | undefined> {
  var query = '?page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<SystemUser>>(SystemUserEnd.Search + query);
}

export async function insertSystemUser(
  systemUser: SystemUser,
  userRoleIds: number[]
): Promise<SystemUser | undefined> {
  return await httpPost<SystemUser>(SystemUserEnd.Insert, {
    ...systemUser,
    userRoleIds,
  });
}

export async function updateSystemUser(
  systemUser: SystemUser,
  newUserRoleIds: number[],
  deletedUserAccessIds: number[]
): Promise<boolean | undefined> {
  return await httpPut(SystemUserEnd.Update + '/' + systemUser.id, {
    ...systemUser,
    newUserRoleIds,
    deletedUserAccessIds,
  });
}

export async function deleteSystemUser(
  id: number
): Promise<boolean | undefined> {
  return await httpDelete(SystemUserEnd.Delete + '/' + id);
}

export async function resetPassword(id: number): Promise<boolean | undefined> {
  return await httpPut(SystemUserEnd.ResetPassword + '/' + id);
}
