import { configureStore } from '@reduxjs/toolkit';
import designationModalReducer from './reducers/designation-modal-reducer';
import designationReducer from './reducers/designation-reducer';
import employeeReducer from './reducers/employee-reducer';
const store = configureStore({
  reducer: {
    employee: employeeReducer,
    designation: designationReducer,
    designationModal: designationModalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
