import Eligibility from './Eligibility';
import ManageableInterface from './ManageableEntity';

export default interface EmployeeEligibility extends ManageableInterface {
  id: number;
  employeeId: number | undefined;
  eligibilityId: number | undefined;
  eligibility: Eligibility | undefined;
}
