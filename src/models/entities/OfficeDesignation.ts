import { Guid } from 'guid-typescript';
import Designation from './Designation';

export default interface OfficeDesignation {
  tempId: string;
  id: number;
  officeId: number;
  designationId: number;
  designation: Designation | undefined;

  deleted?: boolean;
}
