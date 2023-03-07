import { NatureOfEmploymentEnd } from '../endpoints';
import Position from '../models/entities/Position';
import NatureOfEmployment from '../models/entities/NatureOfEmployment';
import { httpGet } from './base';

export async function getNatureOfEmployments(): Promise<
  NatureOfEmployment[] | undefined
> {
  return await httpGet<Position[]>(NatureOfEmploymentEnd.GetList);
}
