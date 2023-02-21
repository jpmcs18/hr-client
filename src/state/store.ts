import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './reducers/employee-reducer';
const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
