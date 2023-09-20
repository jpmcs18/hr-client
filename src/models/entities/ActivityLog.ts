import SystemUser from './SystemUser';

export default interface ActivityLog {
  id: number;
  date: Date;
  user: SystemUser;
  log: string;
  table: string;
}
