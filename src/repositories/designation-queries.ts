import { DesignationEnd } from '../endpoints';
import Designation from '../models/entities/Designation';
import SearchResult from '../models/response-model/SearchResult';
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

export async function getDesignations(): Promise<Designation[] | undefined> {
  return await httpGet<Designation[]>(DesignationEnd.GetList);
}

export async function insertDesignation(
  designation: Designation
): Promise<Designation | undefined> {
  return await httpPost<Designation>(DesignationEnd.Insert, designation);
}

export async function updateDesignation(
  designation: Designation
): Promise<boolean | undefined> {
  return await httpPut(
    DesignationEnd.Update + '/' + designation.id,
    designation
  );
}

export async function deleteDesignation(
  id: number
): Promise<boolean | undefined> {
  return await httpDelete(DesignationEnd.Delete + '/' + id);
}
