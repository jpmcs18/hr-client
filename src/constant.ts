export const API =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV
    : window.location.protocol === 'http:'
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_SECURED_PROD;
export const AppName = 'App';
export const APP_SECRET = process.env.REACT_APP_SECRET_KEY;

export const totalSalaryGrades = 32;
export const totalSteps = 8;

export const Pages = {
  Employees: 'Employees',
  Positions: 'Positions',
  Offices: 'Offices',
  SalaryGrade: 'Salary Grades',
  Users: 'Users',
  UserRoles: 'User Roles',
  Reports: 'Reports',
};
