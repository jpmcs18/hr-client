import SystemUser from './SystemUser';

export default interface ActivityLog {
  id: number;
  date: Date;
  log: string;
  table: string;
  user: SystemUser | undefined;
}
