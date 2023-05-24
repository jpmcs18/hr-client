import { RequestHistoryEnd } from '../endpoints';
import RequestHistory from '../models/entities/RequestHistory';
import SearchResult from '../models/response-model/SearchResult';
import { httpGet } from './base';

export async function searchRequestHistory(
  employee: string | undefined,
  requestTypeId: number | undefined,
  page: number
): Promise<SearchResult<RequestHistory> | undefined> {
  var query = '?page=' + page;
  if (!!employee) {
    query += '&employee=' + encodeURIComponent(employee);
  }
  if (!!requestTypeId) {
    query += '&requestTypeId=' + requestTypeId;
  }
  return await httpGet<SearchResult<RequestHistory>>(
    RequestHistoryEnd.Search + query
  );
}
