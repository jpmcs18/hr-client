import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LeaveRequestTypeDefaults } from '../../constant';
import { validateDate } from '../../helper';
import CustomReturn from '../../models/client-model/CustomReturn';
import LeaveRequest from '../../models/entities/LeaveRequest';
import LeaveRequestType from '../../models/entities/LeaveRequestType';
import { Step } from '../../page/components/custom-steps';

interface State {
  leaveRequest: LeaveRequest;
  leaveRequestTypes: LeaveRequestType[];
  steps: Step[];
  currentStep: number;
  availableLeaveCredits: number | undefined;
  hasLeaveCredits: boolean;
  isModalShow: boolean;
  continueToStep3: boolean;
}
const initialLeaveRequestState: LeaveRequest = {
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
const stepsDefault: Step[] = [
  {
    step: 1,
    description: 'Leave Types',
  },
  {
    step: 2,
    description: 'Leave Details',
  },
  {
    step: 3,
    description: 'Summary',
  },
];
const initialState: State = {
  leaveRequest: initialLeaveRequestState,
  leaveRequestTypes: [],
  steps: stepsDefault,
  currentStep: 1,
  isModalShow: false,
  availableLeaveCredits: 0,
  hasLeaveCredits: false,
  continueToStep3: false,
};

const leaveApplicationSlice = createSlice({
  name: 'leave-application',
  initialState: initialState,
  reducers: {
    setEmployeeId(state, action: PayloadAction<number>) {
      state.leaveRequest = {
        ...state.leaveRequest,
        employeeId: action.payload,
      };
    },
    setLeaveRequestTypes(state, action: PayloadAction<LeaveRequestType[]>) {
      state.leaveRequestTypes = action.payload;
    },
    setCurrentStep(state, action: PayloadAction<any>) {
      state.currentStep = action.payload;
    },
    setLeaveRequestType(state, action: PayloadAction<LeaveRequestType>) {
      state.leaveRequest = {
        ...state.leaveRequest,
        leaveRequestType: action.payload,
        leaveRequestTypeId: action.payload.id,
      };
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
      state.hasLeaveCredits = !!action.payload.leaveTypeId;

      if (
        +(action.payload.id ?? 0) === +LeaveRequestTypeDefaults.VacationLeave ||
        +(action.payload.id ?? 0) ===
          +LeaveRequestTypeDefaults.SpecialPriviledgeLeave
      ) {
        state.leaveRequest = {
          ...state.leaveRequest,
          isLocal: true,
          location: '',
        };
      }
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

      if (state.leaveRequest.isMultipleDays) {
        state.continueToStep3 =
          validateDate(state.leaveRequest.startDate) &&
          validateDate(state.leaveRequest.endDate) &&
          !!state.leaveRequest.totalLeaveCredits;
      } else {
        state.continueToStep3 = validateDate(state.leaveRequest.startDate);
      }
    },
    setAvailableLeaveCredits(state, action: PayloadAction<number | undefined>) {
      state.availableLeaveCredits = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;

      if (action.payload) {
        state.leaveRequest = initialLeaveRequestState;
        state.currentStep = 1;
      }
    },
  },
});

export default leaveApplicationSlice.reducer;
export const leaveApplicationActions = leaveApplicationSlice.actions;
