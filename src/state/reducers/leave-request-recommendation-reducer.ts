import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  applicationCount: number;
  initiateSearch: boolean;
}

const initialState: State = {
  applicationCount: 0,
  initiateSearch: false,
};

const leaveRequestRecommendationSlice = createSlice({
  name: 'leave-request-recommendation',
  initialState: initialState,
  reducers: {
    setApplicationCount(state, action: PayloadAction<number>) {
      state.applicationCount = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
  },
});

export default leaveRequestRecommendationSlice.reducer;
export const leaveRequestRecommendationActions =
  leaveRequestRecommendationSlice.actions;
