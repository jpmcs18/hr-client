import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserRole from '../../models/entities/UserRole';

interface State {
  userRoles: UserRole[];
  selectedUserRole: UserRole | undefined;
}
const initialState: State = {
  userRoles: [],
  selectedUserRole: undefined,
};

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<UserRole[]>) {
      state.userRoles = action.payload;
      state.selectedUserRole = undefined;
    },
    setSelected(state, action: PayloadAction<UserRole | undefined>) {
      state.selectedUserRole = action.payload;
    },
  },
});

export default userRoleSlice.reducer;
export const userRoleActions = userRoleSlice.actions;
