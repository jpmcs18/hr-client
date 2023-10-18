export const API =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV
    : window.location.protocol === 'http:'
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_SECURED_PROD;
export const AppName = 'HRIS';
export const APP_SECRET = process.env.REACT_APP_SECRET_KEY;

export const totalSalaryGrades = 32;
export const totalSteps = 8;
export const genderFemale: number = 2;
export const civilStatusMarried: number = 1;
export const Pages = {
  Dashboard: 'Dashboard',
  Employees: 'Employees',
  Attachment: 'Employee Attachments',
  ServiceRecord: 'Service Record',
  PersonalHistory: 'Personal History',
  EmployeeLeaveCredits: 'Employee Leave Credits',
  Positions: 'Positions',
  Offices: 'Offices',
  SalaryGrade: 'Salary Grades',
  Users: 'Users',
  UserRoles: 'User Roles',
  Reports: 'Reports',
  RequestHistory: 'Request History',
  KeyGenerator: 'Key Generator',
  ActivityLog: 'Activity Log',
  LeaveRequests: 'Leave Requests',
  LeaveRequestApprovers: 'Leave Request Approvers',
  WorkSchedules: 'Work Schedules',
  EmployeeSchedule: 'Employee Schedule',
  TimeLogs: 'Time Logs',
  DTRExport: 'DTR Export',
};

export enum LeaveRequestTypeDefaults {
  VacationLeave = 1,
  SpecialPriviledgeLeave = 6,
  SickLeave = 3,
  SpecialLeaveBenefitforWomen = 11,
  StudyLeave = 8,
}

export enum LeaveRequestStatusDefaults {
  Pending = 1,
  Recommended = 2,
  Approved = 3,
  Disapproved = 4,
}
