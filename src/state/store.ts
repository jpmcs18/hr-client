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
const store = configureStore({
  reducer: {
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
