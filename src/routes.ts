import ModuleRoute from './models/client-model/ModuleRoute';

const SystemModules: ModuleRoute[] = [
  { id: 0, pageName: 'Home', route: '/', display: false },
  { id: 0, pageName: 'Dashboard', route: '/dashboard', display: false },
  { id: 1, pageName: 'Employees', route: '/employees', display: true },
  { id: 2, pageName: 'Designation', route: '/designations', display: true },
  { id: 3, pageName: 'Offices', route: '/offices', display: true },
  { id: 4, pageName: 'Users', route: '/users', display: true },
  { id: 5, pageName: 'User Roles', route: '/user-roles', display: true },
];
export default SystemModules;
