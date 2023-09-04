import { EmployeeScheduleEnd } from '../endpoints';
import { httpPost } from './base';

export async function addEmployeeScheduleBySelectedOffice(
  workScheduleId: number,
  officeId: number
): Promise<boolean | undefined> {
  return await httpPost<boolean>(EmployeeScheduleEnd.SelectedOffice, {
    workScheduleId,
    officeId,
  });
}

export async function addEmployeeScheduleBySelectedEmployee(
  workScheduleId: number,
  employeeId: number
): Promise<boolean | undefined> {
  return await httpPost<boolean>(EmployeeScheduleEnd.SelectedEmployee, {
    workScheduleId,
    employeeId,
  });
}

export async function addEmployeeScheduleByCheckedOffices(
  workScheduleId: number,
  officeIds: number[]
): Promise<boolean | undefined> {
  return await httpPost<boolean>(EmployeeScheduleEnd.CheckedOffices, {
    workScheduleId,
    officeIds,
  });
}

export async function addEmployeeScheduleByCheckedEmployeesOfSelectedOffice(
  workScheduleId: number,
  employeeIds: number[]
): Promise<boolean | undefined> {
  return await httpPost<boolean>(
    EmployeeScheduleEnd.CheckedEmployeesOfSelectedOffice,
    {
      workScheduleId,
      employeeIds,
    }
  );
}

export async function addEmployeeScheduleAll(
  workScheduleId: number
): Promise<boolean | undefined> {
  return await httpPost<boolean>(EmployeeScheduleEnd.All, {
    workScheduleId,
  });
}

export async function DeleteEmployeeScheduleByCheckedEmployees(
  workScheduleId: number,
  employeeIds: number[]
): Promise<boolean | undefined> {
  return await httpPost<boolean>(EmployeeScheduleEnd.DeleteCheckedEmployees, {
    workScheduleId,
    employeeIds,
  });
}
