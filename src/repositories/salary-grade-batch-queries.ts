import { SalaryGradeBatchEnd } from '../endpoints';
import SalaryGradeBatch from '../models/entities/SalaryGradeBatch';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchSalaryGradeBatch(
  page: number
): Promise<SearchResult<SalaryGradeBatch> | undefined> {
  var query = '?page=' + page;
  return await httpGet<SearchResult<SalaryGradeBatch>>(
    SalaryGradeBatchEnd.Search + query
  );
}

export async function getSalaryGradeBatches(): Promise<
  SalaryGradeBatch[] | undefined
> {
  return await httpGet<SalaryGradeBatch[]>(SalaryGradeBatchEnd.GetList);
}

export async function insertSalaryGradeBatch(
  salaryGradeBatch: SalaryGradeBatch
): Promise<SalaryGradeBatch | undefined> {
  return await httpPost<SalaryGradeBatch>(
    SalaryGradeBatchEnd.Insert,
    salaryGradeBatch
  );
}

export async function updateSalaryGradeBatch(
  salaryGradeBatch: SalaryGradeBatch
): Promise<boolean | undefined> {
  return await httpPut(
    SalaryGradeBatchEnd.Update + '/' + salaryGradeBatch.id,
    salaryGradeBatch
  );
}

export async function deleteSalaryGradeBatch(
  id: number
): Promise<boolean | undefined> {
  return await httpDelete(SalaryGradeBatchEnd.Delete + '/' + id);
}
