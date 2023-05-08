import { PersonalHistoryEnd } from '../endpoints';
import PersonalHistory from '../models/entities/PersonalHistory';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function getPersonalHistories(
  personalId: number,
  page: number
): Promise<SearchResult<PersonalHistory> | undefined> {
  var query = `?id=${personalId}&page=${page}`;
  return await httpGet<SearchResult<PersonalHistory>>(
    PersonalHistoryEnd.Search + query
  );
}

export async function insertPersonalHistory(
  personalHistory: PersonalHistory
): Promise<PersonalHistory | undefined> {
  return await httpPost<PersonalHistory>(
    PersonalHistoryEnd.Insert,
    personalHistory
  );
}

export async function updatePersonalHistory(
  personalHistory: PersonalHistory
): Promise<boolean> {
  return await httpPut(
    PersonalHistoryEnd.Update + '/' + personalHistory.id,
    personalHistory
  );
}

export async function deletePersonalHistory(id: number): Promise<boolean> {
  return await httpDelete(PersonalHistoryEnd.Delete + '/' + id);
}
