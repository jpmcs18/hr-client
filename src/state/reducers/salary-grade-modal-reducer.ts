import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'guid-typescript';
import { totalSalaryGrades, totalSteps } from '../../constant';
import { toDisplayAmount } from '../../helper';
import CustomReturn from '../../models/client-model/CustomReturn';
import SalaryGradeBatch from '../../models/entities/SalaryGradeBatch';
import SalaryGradeItem from '../../models/entities/SalaryGradeItem';

interface State {
  salaryGradeBatch: SalaryGradeBatch;
  salaryGradeItems: SalaryGradeItem[][];
  isModalShow: boolean;
}
const salaryGradeBatchInitialState: SalaryGradeBatch = {
  id: 0,
  description: '',
  validityDate: undefined,
  expiryDate: undefined,
  salaryGradeItems: undefined,
};
const initialState: State = {
  salaryGradeBatch: salaryGradeBatchInitialState,
  salaryGradeItems: [],
  isModalShow: false,
};

const salaryGradeModalSlice = createSlice({
  name: 'salary-grade-modal',
  initialState: initialState,
  reducers: {
    setSalaryGradeBatch(
      state,
      action: PayloadAction<SalaryGradeBatch | undefined>
    ) {
      state.salaryGradeBatch = action.payload ?? salaryGradeBatchInitialState;
      state.salaryGradeItems = [];
      if (!action.payload?.salaryGradeItems?.length) {
        for (let i = 1; i <= totalSalaryGrades; i++) {
          let sg: SalaryGradeItem[] = [];
          for (let j = 1; j <= totalSteps; j++) {
            sg.push({
              id: 0,
              salaryGradeBatchId: state.salaryGradeBatch.id,
              salaryGrade: i,
              step: j,
              amount: 0,
              tempAmount: '0.00',
              tempId: Guid.create().toString(),
            });
          }
          state.salaryGradeItems.push(sg);
        }
      } else {
        for (let i = 1; i <= totalSalaryGrades; i++) {
          let sg: SalaryGradeItem[] = [];
          for (let j = 1; j <= totalSteps; j++) {
            sg.push(
              action.payload.salaryGradeItems
                .map((x) => {
                  return {
                    ...x,
                    tempId: Guid.create().toString(),
                    tempAmount: toDisplayAmount(x.amount.toString()),
                  };
                })
                .filter((x) => x.salaryGrade === i && x.step === j)[0]
            );
          }
          state.salaryGradeItems.push(sg);
        }
      }
    },
    updateSalaryGradeBatch(state, action: PayloadAction<CustomReturn>) {
      state.salaryGradeBatch = {
        ...state.salaryGradeBatch,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    updateSalaryGrade(
      state,
      action: PayloadAction<{
        tempId: string;
        index: number;
        amount: string;
      }>
    ) {
      state.salaryGradeItems[action.payload.index] = state.salaryGradeItems[
        action.payload.index
      ]
        .slice()
        .map((sg) => {
          if (sg.tempId === action.payload.tempId) {
            sg.tempAmount = action.payload.amount;
            sg.amount = +action.payload.amount.replaceAll(',', '');
          }

          return sg;
        });
    },
  },
});

export default salaryGradeModalSlice.reducer;
export const salaryGradeModalActions = salaryGradeModalSlice.actions;
