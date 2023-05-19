import { RemunerationEnd } from '../endpoints';
import Remuneration from '../models/entities/Remuneration';
import { httpGet } from './base';

export async function getRemunerations(): Promise<Remuneration[] | undefined> {
  return await httpGet<Remuneration[]>(RemunerationEnd.GetList);
}
