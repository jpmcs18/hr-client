import { RequestTypeEnd } from '../endpoints';
import RequestType from '../models/entities/RequestType';
import { httpGet } from './base';

export async function getRequestTypes(): Promise<RequestType[] | undefined> {
  return await httpGet<RequestType[]>(RequestTypeEnd.GetList);
}
