import { configureStore } from '@reduxjs/toolkit';
import designationModalReducer from './reducers/designation-modal-reducer';
import designationReducer from './reducers/designation-reducer';
import employeeReducer from './reducers/employee-reducer';
import officeModalReducer from './reducers/office-modal-reducer';
import officeReducer from './reducers/office-reducer';
const store = configureStore({
  reducer: {
    employee: employeeReducer,
    designation: designationReducer,
    designationModal: designationModalReducer,
    office: officeReducer,
    officeModal: officeModalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
