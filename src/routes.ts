import { Pages } from './constant';
import ModuleRoute from './models/client-model/ModuleRoute';

export const SystemModules: ModuleRoute[] = [
  { route: '/', display: false }, //0
  { route: '/dashboard', display: false }, //1
  { id: 1, pageName: Pages.Employees, route: '/employees', display: true }, //2
  { id: 2, pageName: Pages.Attachment, route: '', display: false }, //2
  { id: 3, pageName: Pages.ServiceRecord, route: '', display: false }, //2
  { id: 4, pageName: Pages.PersonalHistory, route: '', display: false }, //2
  {
    id: 10,
    pageName: Pages.Positions,
    route: '/positions',
    display: true,
  }, //3
  { id: 20, pageName: Pages.Offices, route: '/offices', display: true }, //4
  { id: 30, pageName: Pages.Users, route: '/users', display: true }, //5
  { id: 40, pageName: Pages.UserRoles, route: '/user-roles', display: true }, //6
  {
    id: 50,
    pageName: Pages.SalaryGrade,
    route: '/salary-grades',
    display: true,
  }, //7
  {
    id: 60,
    pageName: Pages.Reports,
    route: '/reports',
    display: true,
  },
  {
    id: 70,
    pageName: Pages.RequestHistory,
    route: '/request-history',
    display: true,
  },
  {
    id: 80,
    pageName: Pages.LeaveRequests,
    route: '/leave-request',
    display: true,
  },
  {
    id: 80,
    pageName: Pages.LeaveRequestApprovers,
    route: '/leave-request-approvers',
    display: true,
  },
];
