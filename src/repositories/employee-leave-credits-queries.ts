import { EmployeeLeaveCreditsEnd } from '../endpoints';
import EmployeeLeaveCredits from '../models/entities/EmployeeLeaveCredits';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function getEmployeeAvailableLeaveCredits(
  employeeId: number,
  leaveRequestTypeId: number
): Promise<number | undefined> {
  return await httpGet<number>(
    EmployeeLeaveCreditsEnd.GetAvailableLeaveCredits +
      `?employeeId=${employeeId}&leaveRequestTypeId=${leaveRequestTypeId}`
  );
}

export async function getEmployeeLeaveCredits(
  employeeId: number
): Promise<EmployeeLeaveCredits[] | undefined> {
  return await httpGet(EmployeeLeaveCreditsEnd.GetList + '/' + employeeId);
}

export async function insertEmployeeLeaveCredits(
  employeeLeaveCredits: EmployeeLeaveCredits
): Promise<boolean | undefined> {
  return await httpPost(EmployeeLeaveCreditsEnd.Insert, employeeLeaveCredits);
}

export async function updateEmployeeLeaveCredits(
  employeeLeaveCredits: EmployeeLeaveCredits
): Promise<boolean | undefined> {
  return await httpPut(
    EmployeeLeaveCreditsEnd.Update + '/' + employeeLeaveCredits.id,
    employeeLeaveCredits
  );
}
export async function deleteEmployeeLeaveCredits(
  id: number
): Promise<boolean | undefined> {
  return await httpDelete(EmployeeLeaveCreditsEnd.Delete + '/' + id);
}
