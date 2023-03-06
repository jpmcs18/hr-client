import { CivilStatusEnd } from '../endpoints';
import CivilStatus from '../models/entities/CivilStatus';
import { httpGet } from './base';

export async function getCivilStatuses(): Promise<CivilStatus[] | undefined> {
  return await httpGet<CivilStatus[]>(CivilStatusEnd.GetList);
}
