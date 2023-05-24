import { ReportEnd } from '../endpoints';
import { dateToString } from '../helper';
import { httpGet } from './base';

export async function generateContractualCOE(
  employeeId: number,
  date: Date,
  purpose: string
): Promise<string | undefined> {
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

export async function generateRegularCOE(
  employeeId: number,
  date: Date,
  purpose: string
): Promise<string | undefined> {
  return await httpGet<string>(
    ReportEnd.RegularCOE +
      '?employeeId=' +
      employeeId +
      '&date=' +
      encodeURIComponent(dateToString(date) ?? '') +
      '&purpose=' +
      encodeURIComponent(purpose)
  );
}

export async function generateServiceRecord(
  employeeId: number,
  date: Date,
  purpose: string
): Promise<string | undefined> {
  return await httpGet<string>(
    ReportEnd.ServiceRecord +
      '?employeeId=' +
      employeeId +
      '&date=' +
      encodeURIComponent(dateToString(date) ?? '') +
      '&purpose=' +
      encodeURIComponent(purpose)
  );
}
