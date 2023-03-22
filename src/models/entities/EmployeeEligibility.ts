import Eligibility from './Eligibility';
import ManageableInterface from './ManageableEntity';

export default interface EmployeeEligibility extends ManageableInterface {
  id: number;
  employeeId: number | undefined;
  eligibilityId: number | undefined;
  place: string | undefined;
  rating: string | undefined;
  date: Date | undefined;
  validity: Date | undefined;
  eligibility: Eligibility | undefined;
}
