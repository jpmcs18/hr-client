import { NatureOfEmploymentEnd } from '../endpoints';
import NatureOfEmployment from '../models/entities/NatureOfEmployment';
import { httpGet } from './base';

export async function getNatureOfEmployments(): Promise<
  NatureOfEmployment[] | undefined
> {
  return await httpGet<NatureOfEmployment[]>(NatureOfEmploymentEnd.GetList);
}
