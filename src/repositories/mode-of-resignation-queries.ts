import { BloodTypeEnd, ModeOfResignationEnd } from '../endpoints';
import BloodType from '../models/entities/BloodType';
import ModeOfResignation from '../models/entities/ModeOfResignation';
import { httpGet } from './base';

export async function getModeOfResignations(): Promise<
  ModeOfResignation[] | undefined
> {
  return await httpGet<ModeOfResignation[]>(ModeOfResignationEnd.GetList);
}
