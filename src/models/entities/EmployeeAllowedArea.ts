import Area from './Area';

export default interface EmployeeAllowedArea {
  id: number;
  employeeId: number;
  areaId: number;
  validStartDate: Date | undefined;
  validEndDate: Date | undefined;
  sun: boolean;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;

  area?: Area | undefined;
}
