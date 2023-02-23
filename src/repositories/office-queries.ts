import { OfficeEnd } from '../endpoints';
import Office from '../entities/Office';
import SearchResult from '../response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchOffice(
  key: string,
  page: number
): Promise<SearchResult<Office> | undefined> {
  var query = '?page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<Office>>(OfficeEnd.Search + query);
}

export async function getOffices(): Promise<Office[] | undefined> {
  return await httpGet<Office[]>(OfficeEnd.GetList);
}

export async function insertOffice(
  office: Office,
  designationIds: number[]
): Promise<Office | undefined> {
  return await httpPost<Office>(OfficeEnd.Insert, {
    ...office,
    designationIds,
  });
}

export async function updateOffice(
  office: Office,
  newDesignationIds: number[],
  designationIdsToDelete: number[]
): Promise<boolean | undefined> {
  return await httpPut(OfficeEnd.Update + '/' + office.id, {
    ...office,
    newDesignationIds,
    designationIdsToDelete,
  });
}

export async function deleteOffice(id: number): Promise<boolean | undefined> {
  return await httpDelete(OfficeEnd.Delete + '/' + id);
}