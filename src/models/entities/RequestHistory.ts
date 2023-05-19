import Employee from './Employee';
import RequestType from './RequestType';

export default interface RequestHistory {
  id: number;
  requestTypeId: number;
  preparedById: number | undefined;
  employeeId: number;
  date: Date;
  purpose: string;

  employee: Employee | undefined;
  preparedBy: Employee | undefined;
  requestType: RequestType | undefined;
}
