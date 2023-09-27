import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import RequestHistory from '../../models/entities/RequestHistory';
import RequestType from '../../models/entities/RequestType';

interface State extends Searchable {
  requestHistories: RequestHistory[];
  selectedRequestHistory: RequestHistory | undefined;
  requestTypeId: number | undefined;
  requestTypes: RequestType[];
}
const initialState: State = {
  requestHistories: [],
  selectedRequestHistory: undefined,
  key: '',
  requestTypeId: undefined,
  currentPage: 1,
  pageCount: 0,
  initiateSearch: false,
  requestTypes: [],
};

const requestHistorySlice = createSlice({
  name: 'requestHistory',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<RequestHistory[]>) {
      state.requestHistories = action.payload;
      state.selectedRequestHistory = undefined;
    },
    setRequestTypes(state, action: PayloadAction<RequestType[]>) {
      state.requestTypes = action.payload;
    },
    setSelected(state, action: PayloadAction<RequestHistory | undefined>) {
      state.selectedRequestHistory = action.payload;
    },
    setkey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
    setRequestTypeId(state, action: PayloadAction<number | undefined>) {
      state.requestTypeId = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
  },
});

export default requestHistorySlice.reducer;
export const requestHistoryActions = requestHistorySlice.actions;
