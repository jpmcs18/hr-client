import Employee from './Employee';
import OfficePosition from './OfficePosition';

export default interface Office {
  id: number;
  abbreviation: string | undefined;
  description: string | undefined;
  departmentHeadId: number | undefined;

  departmentHead?: Employee | undefined;
  positions: OfficePosition[] | undefined;
}
