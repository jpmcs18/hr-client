import { EligibilityEnd } from '../endpoints';
import Eligibility from '../models/entities/Eligibility';
import { httpGet } from './base';

export async function getEligibilities(): Promise<Eligibility[] | undefined> {
  return await httpGet<Eligibility[]>(EligibilityEnd.GetList);
}
