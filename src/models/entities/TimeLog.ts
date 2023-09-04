import Area from './Area';

export default interface TimeLog {
  id: number;
  employeeId: number;
  loginDate: Date | undefined;
  logoutDate: Date | undefined;
  areaInId: number | undefined;
  areaOutId: number | undefined;

  areaIn?: Area | undefined;
  areaOut?: Area | undefined;
}
