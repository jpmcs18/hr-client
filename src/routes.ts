import { Pages } from './constant';
import ModuleRoute from './models/client-model/ModuleRoute';

const SystemModules: ModuleRoute[] = [
  { route: '/', display: false }, //0
  { route: '/dashboard', display: false }, //1
  { id: 1, pageName: Pages.Employees, route: '/employees', display: true }, //2
  {
    id: 2,
    pageName: Pages.Designations,
    route: '/designations',
    display: true,
  }, //3
  { id: 3, pageName: Pages.Offices, route: '/offices', display: true }, //4
  { id: 4, pageName: Pages.Users, route: '/users', display: true }, //5
  { id: 5, pageName: Pages.UserRoles, route: '/user-roles', display: true }, //6
];
export default SystemModules;
