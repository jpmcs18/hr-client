import { NatureOfEmploymentEnd } from '../endpoints';
import Designation from '../models/entities/Designation';
import NatureOfEmployment from '../models/entities/NatureOfEmployment';
import { httpGet } from './base';

export async function getNatureOfEmployments(): Promise<
  NatureOfEmployment[] | undefined
> {
  return await httpGet<Designation[]>(NatureOfEmploymentEnd.GetList);
}
