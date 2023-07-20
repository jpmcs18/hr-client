import { configureStore } from '@reduxjs/toolkit';
import positionModalReducer from './reducers/position-modal-reducer';
import positionReducer from './reducers/position-reducer';
import employeeAttachmentModalReducer from './reducers/employee-attachment-modal-reducer';
import employeeModalReducer from './reducers/employee-modal-reducer';
import employeeReducer from './reducers/employee-reducer';
import officeModalReducer from './reducers/office-modal-reducer';
import officeReducer from './reducers/office-reducer';
import systemUserModalReducer from './reducers/system-user-modal-reducer';
import systemUserReducer from './reducers/system-user-reducer';
import userProfileReducer from './reducers/user-profile-reducer';
import userRoleModalReducer from './reducers/user-role-modal-reducer';
import userRoleReducer from './reducers/user-role-reducer';
import salaryGradeBatchReducer from './reducers/salary-grade-batch-reducer';
import salaryGradeModalReducer from './reducers/salary-grade-modal-reducer';
import employeeHistoryModalReducer from './reducers/employee-history-modal-reducer';
import serviceRecordModalReducer from './reducers/service-record-modal-reducer';
import personalHistoryModalReducer from './reducers/personal-history-modal-reducer';
import employeeSearchableReducer from './reducers/employee-searchable-reducer';
import reportModalReducer from './reducers/report-modal-reducer';
import employeePromotionReducer from './reducers/employee-promotion-reducer';
import requestHistoryReducer from './reducers/request-history-reducer';
import employeeLeaveCreditsReducer from './reducers/employee-leave-credits-reducer';
import employeeLeaveCreditsModalReducer from './reducers/employee-leave-credits-modal-reducer';
import dropdownReducer from './reducers/dropdown-reducer';
import employeeLeaveCreditsHistoryModalReducer from './reducers/employee-leave-credits-history-modal-reducer';
import leaveRequestReducer from './reducers/leave-request-reducer';
import leaveRequestModalReducer from './reducers/leave-request-modal-reducer';
import leaveRequestApprovalReducer from './reducers/leave-request-approval-reducer';
import leaveRequestDisapprovalReducer from './reducers/leave-request-disapproval-reducer';
import leaveApplicationReducer from './reducers/leave-application-reducer';
import leaveRequestApproverReducer from './reducers/leave-request-approver-reducer';
import leaveRequestApproverModalReducer from './reducers/leave-request-approver-modal-reducer';
import leaveRequestRecommendationReducer from './reducers/leave-request-recommendation-reducer';
import leaveRequestRecommendationModalReducer from './reducers/leave-request-recommendation-modal-reducer';
import leaveTransactionReducer from './reducers/leave-transaction-reducer';
import leaveApplicationApprovalReducer from './reducers/leave-application-approval-reducer';
import leaveApplicationAppprovalModalReducer from './reducers/leave-application-appproval-modal-reducer';
const store = configureStore({
  reducer: {
    dropdown: dropdownReducer,
    userProfile: userProfileReducer,
    employee: employeeReducer,
    employeeModal: employeeModalReducer,
    position: positionReducer,
    positionModal: positionModalReducer,
    office: officeReducer,
    officeModal: officeModalReducer,
    userRole: userRoleReducer,
    userRoleModal: userRoleModalReducer,
    systemUser: systemUserReducer,
    systemUserModal: systemUserModalReducer,
    employeeAttachmentModal: employeeAttachmentModalReducer,
    salaryGradeBatch: salaryGradeBatchReducer,
    salaryGradeModal: salaryGradeModalReducer,
    employeeHistoryModal: employeeHistoryModalReducer,
    serviceRecordModal: serviceRecordModalReducer,
    personalHistoryModal: personalHistoryModalReducer,
    employeeSearchable: employeeSearchableReducer,
    reportModal: reportModalReducer,
    employeePromotion: employeePromotionReducer,
    requestHistory: requestHistoryReducer,
    employeeLeaveCredits: employeeLeaveCreditsReducer,
    employeeLeaveCreditsModal: employeeLeaveCreditsModalReducer,
    employeeLeaveCreditsHistoryModal: employeeLeaveCreditsHistoryModalReducer,
    leaveRequest: leaveRequestReducer,
    leaveRequestModal: leaveRequestModalReducer,
    leaveRequestApproval: leaveRequestApprovalReducer,
    leaveRequestDisapproval: leaveRequestDisapprovalReducer,
    leaveApplication: leaveApplicationReducer,
    leaveRequestApprover: leaveRequestApproverReducer,
    leaveRequestApproverModal: leaveRequestApproverModalReducer,
    leaveRequestRecommendation: leaveRequestRecommendationReducer,
    leaveRequestRecommendationModal: leaveRequestRecommendationModalReducer,
    leaveTransaction: leaveTransactionReducer,
    leaveApplicationApproval: leaveApplicationApprovalReducer,
    leaveApplicationApprovalModal: leaveApplicationAppprovalModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
