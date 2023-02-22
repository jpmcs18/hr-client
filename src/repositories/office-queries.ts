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

export async function insertOffice(
  dasignation: Office
): Promise<Office | undefined> {
  return await httpPost<Office>(OfficeEnd.Insert, dasignation);
}

export async function updateOffice(
  dasignation: Office
): Promise<boolean | undefined> {
  return await httpPut(OfficeEnd.Update + '/' + dasignation.id, dasignation);
}

export async function deleteOffice(id: number): Promise<boolean | undefined> {
  return await httpDelete(OfficeEnd.Delete + '/' + id);
}
