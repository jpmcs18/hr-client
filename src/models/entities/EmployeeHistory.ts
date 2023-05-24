import NatureOfEmployment from './NatureOfEmployment';
import Office from './Office';
import Position from './Position';

export default interface EmployeeHistory {
  id: number;
  employeeId: number;
  natureOfEmploymentId?: number | undefined;
  officeId?: number | undefined;
  positionId?: number | undefined;
  detailedOfficeId?: number | undefined;
  detailedPositionId?: number | undefined;
  salary?: number | undefined;
  office?: Office | undefined;
  position?: Position | undefined;
  natureOfEmployment?: NatureOfEmployment | undefined;
  detailedPosition?: Position | undefined;
  detailedOffice?: Office | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}
