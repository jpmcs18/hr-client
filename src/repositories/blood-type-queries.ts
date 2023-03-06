import { BloodTypeEnd } from '../endpoints';
import BloodType from '../models/entities/BloodType';
import { httpGet } from './base';

export async function getBloodTypes(): Promise<BloodType[] | undefined> {
  return await httpGet<BloodType[]>(BloodTypeEnd.GetList);
}
