import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import LeaveRequestApprover from '../../models/entities/LeaveRequestApprover';
import LeaveRequestApproverType from '../../models/entities/LeaveRequestApproverType';

interface State {
  leaveRequestApprover: LeaveRequestApprover;
  leaveRequestApproverTypes: LeaveRequestApproverType[];
  isModalShow: boolean;
}

const initialLeaveRequestApprover: LeaveRequestApprover = {
  id: 0,
  approverId: undefined,
  leaveRequestApproverTypeId: undefined,
};

const initialState: State = {
  leaveRequestApprover: initialLeaveRequestApprover,
  leaveRequestApproverTypes: [],
  isModalShow: false,
};

const leaveRequestApproverModalSlice = createSlice({
  name: 'leave-request-approver-modal',
  initialState: initialState,
  reducers: {
    setLeaveRequestApprover(
      state,
      action: PayloadAction<LeaveRequestApprover | undefined>
    ) {
      state.leaveRequestApprover =
        action.payload ?? initialLeaveRequestApprover;
    },
    setLeaveRequestApproverTypes(
      state,
      action: PayloadAction<LeaveRequestApproverType[]>
    ) {
      state.leaveRequestApproverTypes = action.payload;
    },
    updateLeaveRequestApprover(state, action: PayloadAction<CustomReturn>) {
      state.leaveRequestApprover = {
        ...state.leaveRequestApprover,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.leaveRequestApprover = initialLeaveRequestApprover;
      }
    },
  },
});

export default leaveRequestApproverModalSlice.reducer;
export const leaveRequestApproverModalActions =
  leaveRequestApproverModalSlice.actions;
