import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'guid-typescript';
import Designation from '../../models/entities/Designation';
import Office from '../../models/entities/Office';
import OfficeDesignation from '../../models/entities/OfficeDesignation';

interface State {
  office: Office;
  designations: Designation[];
  newDesignation: number[];
  deletedDesignation: number[];
  officeDesignations: OfficeDesignation[];
  isModalShow: boolean;
}

const initialState: State = {
  office: { id: 0, abbreviation: '', description: '', designations: [] },
  designations: [],
  newDesignation: [],
  deletedDesignation: [],
  officeDesignations: [],
  isModalShow: false,
};

const officeModalSlice = createSlice({
  name: 'office-modal',
  initialState: initialState,
  reducers: {
    setOffice(state, action: PayloadAction<Office>) {
      state.office = action.payload;
      state.officeDesignations =
        state.office.designations
          ?.slice()
          ?.map((x) => {
            return { ...x, tempId: Guid.create().toString(), deleted: false };
          })
          .sort((a, b) =>
            a.designation!.description! < b.designation!.description! ? -1 : 1
          ) ?? [];
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setDesignations(state, action: PayloadAction<Designation[]>) {
      state.designations = action.payload.filter((x) => {
        return !state.office.designations?.filter(
          (y) => y.designationId === x.id
        ).length;
      });
    },
    addNewDesignation(state, action: PayloadAction<string>) {
      state.newDesignation.push(+action.payload);
      state.officeDesignations.push({
        officeId: state.office.id,
        designation: state.designations.filter(
          (x) => x.id === +action.payload
        )[0],
        designationId: +action.payload,
        id: 0,
        tempId: Guid.create().toString(),
        deleted: false,
      });
      state.designations = state.designations.filter(
        (x) => x.id !== +action.payload
      );
    },
    deleteDesignation(state, action: PayloadAction<OfficeDesignation>) {
      if (action.payload.id > 0) {
        state.deletedDesignation.push(action.payload.id);
        state.officeDesignations = state.officeDesignations.map((x) => {
          if (x.id === action.payload.id) {
            x.deleted = true;
          }
          return x;
        });
      } else {
        state.officeDesignations = state.officeDesignations.filter(
          (x) => x.tempId !== action.payload.tempId
        );
        state.newDesignation = state.newDesignation.filter(
          (x) => x !== action.payload.designationId
        );
      }
      state.designations.push(action.payload.designation!);
      state.designations = state.designations
        .slice()
        .sort((a, b) => (a.description! < b.description! ? -1 : 1));
    },
    undoDeleteDesignation(state, action: PayloadAction<number>) {
      state.officeDesignations = state.officeDesignations.map((x) => {
        if (x.id === action.payload) {
          x.deleted = false;
        }
        return x;
      });
    },
  },
});

export default officeModalSlice.reducer;
export const officeModalActions = officeModalSlice.actions;
