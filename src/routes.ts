import ModuleRoute from './models/client-model/ModuleRoute';

const SystemModules: ModuleRoute[] = [
  { id: 0, pageName: 'Home', route: '/', display: false }, //0
  { id: 0, pageName: 'Dashboard', route: '/dashboard', display: false }, //1
  { id: 1, pageName: 'Employees', route: '/employees', display: true }, //2
  { id: 2, pageName: 'Designation', route: '/designations', display: true }, //3
  { id: 3, pageName: 'Offices', route: '/offices', display: true }, //4
  { id: 4, pageName: 'Users', route: '/users', display: true }, //5
  { id: 5, pageName: 'User Roles', route: '/user-roles', display: true }, //6
];
export default SystemModules;
