import ModuleRoute from './client-model/ModuleRoute';

const SystemModules: ModuleRoute[] = [
  { pageName: 'Home', route: '/', display: false },
  { pageName: 'Dashboard', route: '/dashboard', display: false },
  { pageName: 'Employees', route: '/employees', display: true },
  { pageName: 'Offices', route: '/offices', display: true },
  { pageName: 'Users', route: '/users', display: true },
  { pageName: 'User Roles', route: '/user-roles', display: true },
];
export default SystemModules;
