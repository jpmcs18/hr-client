export const SecurityEnd = {
  Refresh: 'securities/refresh-token',
  Login: 'securities/log',
  GenerateKey: 'securities/generate-key',
};

export const SystemUserEnd = {
  GetData: 'system-users/profile',
  SaveProfile: 'system-users/profile',
  Search: 'system-users/search',
  ResetPassword: 'system-users/reset-password',
  Insert: 'system-users',
  Update: 'system-users',
  Delete: 'system-users',
};

export const UserAccessEnd = {
  GetListByUser: 'user-accesses/user',
};

export const EmployeeEnd = {
  Search: 'employees/search',
  SearchInWorkSchedule: 'employees/search/work-schedule',
  SearchWithTimeLog: 'employees/search/timelog',
  SearchNotInWorkSchedule: 'employees/search/work-schedule/not',
  GetList: 'employees',
  Insert: 'employees',
  Update: 'employees',
  Delete: 'employees',
  Promote: 'employees/promote',
};

export const EmployeeHistoryEnd = {
  Search: 'employee-histories/search',
  Insert: 'employee-histories',
  Update: 'employee-histories',
  Delete: 'employee-histories',
};

export const PersonalHistoryEnd = {
  Search: 'personal-histories/search',
  Insert: 'personal-histories',
  Update: 'personal-histories',
  Delete: 'personal-histories',
};

export const PositionEnd = {
  Search: 'positions/search',
  GetList: 'positions',
  Insert: 'positions',
  Update: 'positions',
  Delete: 'positions',
};

export const RequestHistoryEnd = {
  Search: 'request-history/search',
};
export const EmployeeLeaveCreditsHistoryEnd = {
  Search: 'employee-leave-credits-history/search',
};

export const RequestTypeEnd = {
  GetList: 'request-types',
};

export const SalaryGradeBatchEnd = {
  Search: 'salary-grade-batches/search',
  GetList: 'salary-grade-batches',
  Insert: 'salary-grade-batches',
  Update: 'salary-grade-batches',
  Delete: 'salary-grade-batches',
};

export const SalaryGradeItemEnd = {
  Get: 'salary-grade-items',
};

export const UserRoleEnd = {
  Search: 'user-roles/search',
  GetList: 'user-roles',
  Insert: 'user-roles',
  Update: 'user-roles',
  Delete: 'user-roles',
};

export const OfficeEnd = {
  Search: 'offices/search',
  SearchWithTimeLog: 'offices/search/timelog',
  SearchInWorkSchedule: 'offices/search/work-schedule',
  SearchAll: 'offices/search/all',
  GetList: 'offices',
  Insert: 'offices',
  Update: 'offices',
  Delete: 'offices',
};

export const ModuleEnd = {
  GetList: 'modules',
};
export const ModuleRightEnd = {
  GetUserAccess: 'module-rights/access',
};
export const NatureOfEmploymentEnd = {
  GetList: 'nature-of-employments',
};
export const GenderEnd = {
  GetList: 'genders',
};
export const CivilStatusEnd = {
  GetList: 'civil-statuses',
};
export const BloodTypeEnd = {
  GetList: 'blood-types',
};
export const AreaEnd = {
  GetList: 'areas',
};
export const LeaveTypeEnd = {
  GetList: 'leave-types',
};
export const ModeOfSeparationEnd = {
  GetList: 'mode-of-separations',
};
export const VaccinationStatusEnd = {
  GetList: 'vaccination-statuses',
};
export const EligibilityEnd = {
  GetList: 'eligibilities',
};
export const RemunerationEnd = {
  GetList: 'remunerations',
};

export const EmployeeAttachmentEnd = {
  Upload: 'employee-attachments/upload',
  GetList: 'employee-attachments',
  Delete: 'employee-attachments',
};

export const ReportEnd = {
  ServiceRecord: 'reports/service-record',
  ContractualCOE: 'reports/coe-contractual',
  RegularCOE: 'reports/coe-regular',
};

export const EmployeeLeaveCreditsEnd = {
  GetList: 'employee-leave-credits',
  Insert: 'employee-leave-credits',
  Update: 'employee-leave-credits',
  Delete: 'employee-leave-credits',
  GetAvailableLeaveCredits: 'employee-leave-credits/available',
};

export const LeaveRequestEnd = {
  SearchRequest: 'leave-requests/search-requests',
  SearchEmployeeRequest: 'leave-requests/search-employee-requests',
  SearchEmployeesRequest: 'leave-requests/search-employees-requests',
  Insert: 'leave-requests',
  Update: 'leave-requests',
  Delete: 'leave-requests',
  Recommend: 'leave-requests/recommend',
  Approve: 'leave-requests/approve',
  Disapprove: 'leave-requests/disapprove',
  RecommendationCount: 'leave-requests/recommendation/count',
  Recommendation: 'leave-requests/recommendation',
  ApprovalCount: 'leave-requests/approval/count',
  Approval: 'leave-requests/approval',
};

export const LeaveRequestTypeEnd = {
  GetList: 'leave-request-types',
};

export const OTPEnd = {
  Generate: 'otp/generate',
  Validate: 'otp/validate',
};

export const LeaveRequestStatusEnd = {
  GetList: 'leave-request-statuses',
};

export const LeaveRequestApproverEnd = {
  Search: 'leave-request-approvers/search',
  Insert: 'leave-request-approvers',
  Update: 'leave-request-approvers',
  Delete: 'leave-request-approvers',
};

export const LeaveRequestApproverTypeEnd = {
  GetList: 'leave-request-approver-types',
};

export const ScheduleEnd = {
  GetList: 'schedules',
};

export const WorkScheduleEnd = {
  Search: 'work-schedules/search',
  Insert: 'work-schedules',
  Update: 'work-schedules',
  Delete: 'work-schedules',
};

export const EmployeeScheduleEnd = {
  SelectedOffice: 'employee-schedules/office',
  SelectedEmployee: 'employee-schedules/employee',
  CheckedOffices: 'employee-schedules/office/checked',
  CheckedEmployeesOfSelectedOffice: 'employee-schedules/employee/office',
  DeleteCheckedEmployees: 'employee-schedules/employee/mass-delete',
  All: 'employee-schedules/all',
};

export const TimeLogEnd = {
  GetList: 'timelogs',
  Insert: 'timelogs',
  Update: 'timelogs',
  Delete: 'timelogs',
  ActualTimeLog: 'timelogs/report/actual',
  DTR: 'timelogs/report/dtr',
};

export const ActivityLogEnd = {
  Search: 'activity-logs/search',
};
