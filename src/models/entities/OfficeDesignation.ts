import { Guid } from 'guid-typescript';
import Designation from './Designation';
import ManageableInterface from './ManageableEntity';

export default interface OfficeDesignation extends ManageableInterface {
  id: number;
  officeId: number;
  designationId: number;
  designation: Designation | undefined;
}
