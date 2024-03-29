import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ModuleRight from '../../models/entities/ModuleRight';
import SystemUser from '../../models/entities/SystemUser';
import {
  clearSession,
  getSessionAccess,
  getSessionProfile,
  getToken,
  saveSessionAccess,
  saveSessionProfile,
} from '../../repositories/session-managers';

interface State {
  authorize: boolean | undefined;
  systemUser: SystemUser | undefined;
  moduleRights: ModuleRight[];
  module: number[];
}

const initialState: State = {
  authorize: undefined,
  systemUser: undefined,
  moduleRights: [],
  module: [],
};

const userProfileSlice = createSlice({
  name: 'user-profile',
  initialState: initialState,
  reducers: {
    initializeState(state) {
      var token = getToken();
      if (token?.token !== undefined) {
        state.authorize = true;
        state.systemUser = getSessionProfile();
        var access = getSessionAccess() ?? [];
        state.moduleRights = access;
        state.module =
          access
            .map((x) => x.moduleId ?? 0)
            .filter((x, y, z) => z.indexOf(x) === y) ?? [];
      } else {
        state.systemUser = undefined;
        state.authorize = false;
        state.module = [];
        state.moduleRights = [];
        clearSession();
      }
    },
    setProfile(state, action: PayloadAction<SystemUser>) {
      state.systemUser = action.payload;
      saveSessionProfile(action.payload);
    },
    setAuthorize(state, action: PayloadAction<boolean>) {
      state.authorize = action.payload;
      if (!action.payload) {
        state.systemUser = undefined;
        state.authorize = false;
        state.module = [];
        state.moduleRights = [];
        clearSession();
      }
    },
    setAccess(state, action: PayloadAction<ModuleRight[]>) {
      state.moduleRights = action.payload;
      state.module =
        action.payload
          .map((x) => x.moduleId ?? 0)
          .filter((x, y, z) => z.indexOf(x) === y) ?? [];

      saveSessionAccess(action.payload);
    },
    clearProfile(state) {
      state.systemUser = undefined;
      state.authorize = false;
      state.module = [];
      state.moduleRights = [];

      clearSession();
    },
  },
});

export default userProfileSlice.reducer;
export const userProfileAction = userProfileSlice.actions;
