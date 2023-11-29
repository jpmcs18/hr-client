import ManageableInterface from './ManageableEntity';
import Remuneration from './Remuneration';

export default interface EmployeeRemuneration extends ManageableInterface {
  id: number;
  employeeId: number;
  remunerationId: number;
  amount: number;

  remuneration: Remuneration | undefined;
}
