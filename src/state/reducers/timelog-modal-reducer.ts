import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import Area from '../../models/entities/Area';
import TimeLog from '../../models/entities/TimeLog';

interface State {
  timelog: TimeLog;
  areas: Area[];
  isModalShow: boolean;
}
const timelogInitialState: TimeLog = {
  id: 0,
  employeeId: 0,
  loginDate: undefined,
  logoutDate: undefined,
  areaInId: undefined,
  areaOutId: undefined,
};
const initialState: State = {
  timelog: timelogInitialState,
  areas: [],
  isModalShow: false,
};

const timelogModalSlice = createSlice({
  name: 'timelog-modal',
  initialState: initialState,
  reducers: {
    setTimeLog(state, action: PayloadAction<TimeLog | undefined>) {
      state.timelog = action.payload ?? timelogInitialState;
    },
    updateTimeLog(state, action: PayloadAction<CustomReturn>) {
      state.timelog = {
        ...state.timelog,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setAreas(state, action: PayloadAction<Area[]>) {
      state.areas = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default timelogModalSlice.reducer;
export const timelogModalActions = timelogModalSlice.actions;
