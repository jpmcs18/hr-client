import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import CivilStatus from '../../models/entities/CivilStatus';
import PersonalHistory from '../../models/entities/PersonalHistory';

interface State {
  personalHistory: PersonalHistory;
  civilStatuses: CivilStatus[];
  isModalShow: boolean;
}
const personalHistoryInitialState: PersonalHistory = {
  id: 0,
  employeeId: 0,
};

const initialState: State = {
  personalHistory: personalHistoryInitialState,
  civilStatuses: [],
  isModalShow: false,
};

const personalHistoryModalSlice = createSlice({
  name: 'personal-history-modal',
  initialState: initialState,
  reducers: {
    setPersonalHistory(
      state,
      action: PayloadAction<PersonalHistory | undefined>
    ) {
      state.personalHistory = action.payload ?? personalHistoryInitialState;
    },
    updatePersonalHistory(state, action: PayloadAction<CustomReturn>) {
      state.personalHistory = {
        ...state.personalHistory,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setCivilStatuses(state, action: PayloadAction<CivilStatus[]>) {
      state.civilStatuses = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default personalHistoryModalSlice.reducer;
export const personalHistoryModalActions = personalHistoryModalSlice.actions;
