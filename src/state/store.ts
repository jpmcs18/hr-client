import { configureStore } from '@reduxjs/toolkit';
import designationModalReducer from './reducers/designation-modal-reducer';
import designationReducer from './reducers/designation-reducer';
import employeeModalReducer from './reducers/employee-modal-reducer';
import employeeReducer from './reducers/employee-reducer';
import officeModalReducer from './reducers/office-modal-reducer';
import officeReducer from './reducers/office-reducer';
import userRoleModalReducer from './reducers/user-role-modal-reducer';
import userRoleReducer from './reducers/user-role-reducer';
const store = configureStore({
  reducer: {
    employee: employeeReducer,
    employeeModal: employeeModalReducer,
    designation: designationReducer,
    designationModal: designationModalReducer,
    office: officeReducer,
    officeModal: officeModalReducer,
    userRole: userRoleReducer,
    userRoleModal: userRoleModalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
