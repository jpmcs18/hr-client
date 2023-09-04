import { AreaEnd } from '../endpoints';
import Area from '../models/entities/Area';
import { httpGet } from './base';

export async function getAreas(): Promise<Area[] | undefined> {
  return await httpGet<Area[]>(AreaEnd.GetList);
}
