import { GenderEnd } from '../endpoints';
import Gender from '../models/entities/Gender';
import { httpGet } from './base';

export async function getGenders(): Promise<Gender[] | undefined> {
  return await httpGet<Gender[]>(GenderEnd.GetList);
}
