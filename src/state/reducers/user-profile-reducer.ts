import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ModuleRight from '../../models/entities/ModuleRight';
import SystemUser from '../../models/entities/SystemUser';
import TokenData from '../../models/entities/TokenData';
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
  token: TokenData | undefined;
  moduleRights: ModuleRight[];
  module: number[];
  OTP1: string | undefined;
  OTP2: string | undefined;
  OTP3: string | undefined;
  OTP4: string | undefined;
  OTP5: string | undefined;
  OTP6: string | undefined;
  timerMinute: number;
  timerSecond: number;
}

const initialState: State = {
  authorize: undefined,
  systemUser: undefined,
  token: undefined,
  moduleRights: [],
  module: [],
  OTP1: undefined,
  OTP2: undefined,
  OTP3: undefined,
  OTP4: undefined,
  OTP5: undefined,
  OTP6: undefined,
  timerMinute: 0,
  timerSecond: 0,
};

const userProfileSlice = createSlice({
  name: 'user-profile',
  initialState: initialState,
  reducers: {
    initializeState(state) {
      var token = getToken();
      var isClearSession = true;
      if (token?.token !== undefined) {
        state.authorize = true;
        state.systemUser = getSessionProfile();
        var access = getSessionAccess() ?? [];
        state.moduleRights = access;
        state.module =
          access
            .map((x) => x.moduleId ?? 0)
            .filter((x, y, z) => z.indexOf(x) === y) ?? [];

        isClearSession = state.systemUser === undefined;
      }

      if (isClearSession) {
        state.systemUser = undefined;
        state.authorize = false;
        state.module = [];
        state.moduleRights = [];
        clearSession();
      }
    },
    setProfile(state, action: PayloadAction<SystemUser>) {
      state.systemUser = action.payload;
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
    },
    clearProfile(state) {
      state.systemUser = undefined;
      state.authorize = false;
      state.module = [];
      state.moduleRights = [];

      clearSession();
    },
    setOTP(state, action: PayloadAction<string>) {
      if (state.OTP1 === undefined) {
        state.OTP1 = action.payload;
        return;
      }
      if (state.OTP2 === undefined) {
        state.OTP2 = action.payload;
        return;
      }
      if (state.OTP3 === undefined) {
        state.OTP3 = action.payload;
        return;
      }
      if (state.OTP4 === undefined) {
        state.OTP4 = action.payload;
        return;
      }
      if (state.OTP5 === undefined) {
        state.OTP5 = action.payload;
        return;
      }
      if (state.OTP6 === undefined) {
        state.OTP6 = action.payload;
        return;
      }
    },
    removeOTP(state) {
      if (state.OTP6 !== undefined) {
        state.OTP6 = undefined;
        return;
      }
      if (state.OTP5 !== undefined) {
        state.OTP5 = undefined;
        return;
      }
      if (state.OTP4 !== undefined) {
        state.OTP4 = undefined;
        return;
      }
      if (state.OTP3 !== undefined) {
        state.OTP3 = undefined;
        return;
      }
      if (state.OTP2 !== undefined) {
        state.OTP2 = undefined;
        return;
      }
      if (state.OTP1 !== undefined) {
        state.OTP1 = undefined;
        return;
      }
    },
    saveSession(state) {
      state.OTP1 = undefined;
      state.OTP2 = undefined;
      state.OTP3 = undefined;
      state.OTP4 = undefined;
      state.OTP5 = undefined;
      state.OTP6 = undefined;
      state.timerMinute = 0;
      state.timerSecond = 0;
      saveSessionAccess(state.moduleRights);
      saveSessionProfile(state.systemUser!);
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timerMinute = action.payload;
      state.timerSecond = 0;
    },
    decrementTimer(state) {
      if (!(state.timerMinute > 0 || state.timerSecond > 0)) return;
      state.timerSecond = state.timerSecond - 1;
      if (state.timerSecond === -1) {
        state.timerSecond = 59;
        state.timerMinute = state.timerMinute - 1;
      }
    },
  },
});

export default userProfileSlice.reducer;
export const userProfileActions = userProfileSlice.actions;
