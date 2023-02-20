import Designation from './Designation';
import Office from './Office';

export default interface Employee {
  id: number;
  prefix: string | undefined;
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
  extension: string | undefined;
  fullName: string | undefined;
  officeId: number | undefined;
  designationId: number | undefined;
  office: Office | undefined;
  designation: Designation | undefined;
}
