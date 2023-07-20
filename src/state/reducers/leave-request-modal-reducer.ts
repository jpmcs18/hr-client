import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LeaveRequestTypeDefaults } from '../../constant';
import CustomReturn from '../../models/client-model/CustomReturn';
import LeaveRequest from '../../models/entities/LeaveRequest';
import LeaveRequestType from '../../models/entities/LeaveRequestType';

interface State {
  leaveRequest: LeaveRequest;
  isModalShow: boolean;
  leaveRequestTypes: LeaveRequestType[];
  availableLeaveCredits: number | undefined;
  hasLeaveCredits: boolean;
}
const leaveRequestInitialState: LeaveRequest = {
  id: 0,
  employeeId: 0,
  leaveRequestTypeId: 0,
  isWholeDay: true,
  isMultipleDays: false,
  startDate: undefined,
  endDate: undefined,
  totalLeaveCredits: 1,
  requestDate: new Date(),
  leaveRequestStatusId: undefined,
};
const initialState: State = {
  leaveRequest: leaveRequestInitialState,
  isModalShow: false,
  leaveRequestTypes: [],
  availableLeaveCredits: undefined,
  hasLeaveCredits: false,
};

const leaveRequestModalSlice = createSlice({
  name: 'leave-request-modal',
  initialState: initialState,
  reducers: {
    setLeaveRequest(state, action: PayloadAction<LeaveRequest | undefined>) {
      state.leaveRequest = action.payload ?? leaveRequestInitialState;
    },
    updateLeaveRequest(state, action: PayloadAction<CustomReturn>) {
      state.leaveRequest = {
        ...state.leaveRequest,
        [action.payload.elementName]: action.payload.value,
      };

      if (action.payload.elementName === 'isMultipleDays') {
        if (!action.payload.value) {
          state.leaveRequest = {
            ...state.leaveRequest,
            totalLeaveCredits: 1,
          };
        }
      }
      if (action.payload.elementName === 'leaveRequestTypeId') {
        state.leaveRequest = {
          ...state.leaveRequest,
          isLocal: undefined,
          location: undefined,
          isAdmitted: undefined,
          illness: undefined,
          slbwIllness: undefined,
          completionOfMatersDegree: undefined,
          bar: undefined,
        };

        const selectedLeaveRequestType = state.leaveRequestTypes.filter(
          (x) => x.id === +action.payload.value
        )?.[0];

        state.hasLeaveCredits = !!selectedLeaveRequestType.leaveTypeId;

        if (
          +(selectedLeaveRequestType.id ?? 0) ===
            +LeaveRequestTypeDefaults.VacationLeave ||
          +(selectedLeaveRequestType.id ?? 0) ===
            +LeaveRequestTypeDefaults.SpecialPriviledgeLeave
        ) {
          state.leaveRequest = {
            ...state.leaveRequest,
            isLocal: true,
            location: '',
          };
        }
      }
    },
    setLeaveRequestTypes(state, action: PayloadAction<LeaveRequestType[]>) {
      state.leaveRequestTypes = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.leaveRequest = leaveRequestInitialState;
      }
    },
    setAvailableLeaveCredits(state, action: PayloadAction<number | undefined>) {
      state.availableLeaveCredits = action.payload;
    },
  },
});

export default leaveRequestModalSlice.reducer;
export const leaveRequestModalActions = leaveRequestModalSlice.actions;
