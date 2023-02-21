import { DesignationEnd } from '../endpoints';
import Designation from '../entities/Designation';
import SearchResult from '../response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchDesignation(
  key: string,
  page: number
): Promise<SearchResult<Designation> | undefined> {
  var query = '?page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<Designation>>(
    DesignationEnd.Search + query
  );
}

export async function insertDesignation(
  dasignation: Designation
): Promise<Designation | undefined> {
  return await httpPost<Designation>(DesignationEnd.Insert, dasignation);
}

export async function updateDesignation(
  dasignation: Designation
): Promise<boolean | undefined> {
  return await httpPut(
    DesignationEnd.Update + '/' + dasignation.id,
    dasignation
  );
}

export async function deleteDesignation(
  id: number
): Promise<boolean | undefined> {
  return await httpDelete(DesignationEnd.Delete + '/' + id);
}
