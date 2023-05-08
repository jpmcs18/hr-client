import CivilStatus from './CivilStatus';

export default interface PersonalHistory {
  id: number;
  employeeId: number;
  fullName?: string | undefined;
  residenceAddress?: string | undefined;
  contactNumber?: string | undefined;
  emailAddress?: string | undefined;
  civilStatusId?: number | undefined;
  civilStatus?: CivilStatus | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}
