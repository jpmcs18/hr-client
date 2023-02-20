import Designation from './Designation';

export default interface OfficeDesignation {
  id: number;
  officeId: number;
  designationId: number;
  designation: Designation | undefined;
}
