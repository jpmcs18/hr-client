import { ModeOfSeparationEnd } from '../endpoints';
import ModeOfSeparation from '../models/entities/ModeOfSeparation';
import { httpGet } from './base';

export async function getModeOfSeparations(): Promise<
  ModeOfSeparation[] | undefined
> {
  return await httpGet<ModeOfSeparation[]>(ModeOfSeparationEnd.GetList);
}
