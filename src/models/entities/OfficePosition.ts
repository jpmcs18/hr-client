import { Guid } from 'guid-typescript';
import Position from './Position';
import ManageableInterface from './ManageableEntity';

export default interface OfficePosition extends ManageableInterface {
  id: number;
  officeId: number;
  positionId: number;
  position: Position | undefined;
}
