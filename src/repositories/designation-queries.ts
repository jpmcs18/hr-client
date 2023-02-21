import { EmployeeEnd } from '../endpoints';
import Designation from '../entities/Designation';
import Employee from '../entities/Employee';
import SearchResult from '../response-model/SearchResult';
import { httpGet } from './base';

export async function searchDesignation(
  description: string,
  page: number
): Promise<SearchResult<Designation> | undefined> {
  var query = '?page=' + page;
  if (description !== undefined) {
    query = '&description=' + encodeURI(description);
  }
  return await httpGet<SearchResult<Designation>>(
    DesignationEnd.Search + query
  );
}
