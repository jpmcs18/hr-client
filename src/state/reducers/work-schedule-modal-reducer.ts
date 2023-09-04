import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import Schedule from '../../models/entities/Schedule';
import WorkSchedule from '../../models/entities/WorkSchedule';

interface State {
  workSchedule: WorkSchedule;
  schedules: Schedule[];
  isModalShow: boolean;
}
const workScheduleInitialState: WorkSchedule = {
  id: 0,
  effectivityDate: undefined,
  expiryDate: undefined,
  sundayScheduleId: undefined,
  mondayScheduleId: undefined,
  tuesdayScheduleId: undefined,
  wednesdayScheduleId: undefined,
  thursdayScheduleId: undefined,
  fridayScheduleId: undefined,
  saturdayScheduleId: undefined,
};
const initialState: State = {
  schedules: [],
  workSchedule: workScheduleInitialState,
  isModalShow: false,
};

const workScheduleModalSlice = createSlice({
  name: 'work-schedule-modal',
  initialState: initialState,
  reducers: {
    setWorkSchedule(state, action: PayloadAction<WorkSchedule | undefined>) {
      state.workSchedule = action.payload ?? workScheduleInitialState;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setSchedules(state, action: PayloadAction<Schedule[]>) {
      state.schedules = action.payload;
    },
    updateWorkSchedule(state, action: PayloadAction<CustomReturn>) {
      state.workSchedule = {
        ...state.workSchedule,
        [action.payload.elementName]: action.payload.value,
      };
    },
  },
});

export default workScheduleModalSlice.reducer;
export const workScheduleModalActions = workScheduleModalSlice.actions;
