import { ReportEnd } from '../endpoints';
import { dateToString } from '../helper';
import { httpGet } from './base';

export async function generateContractualCOE(
  employeeId: number,
  date: Date,
  purpose: string
): Promise<string | undefined> {
  console.log('dd');
  return await httpGet<string>(
    ReportEnd.ContractualCOE +
      '?employeeId=' +
      employeeId +
      '&date=' +
      encodeURIComponent(dateToString(date) ?? '') +
      '&purpose=' +
      encodeURIComponent(purpose)
  );
}
