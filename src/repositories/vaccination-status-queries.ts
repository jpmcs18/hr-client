import { VaccinationStatusEnd } from '../endpoints';
import VaccinationStatus from '../models/entities/VaccinationStatus';
import { httpGet } from './base';

export async function getVaccinationStatuses(): Promise<
  VaccinationStatus[] | undefined
> {
  return await httpGet<VaccinationStatus[]>(VaccinationStatusEnd.GetList);
}
