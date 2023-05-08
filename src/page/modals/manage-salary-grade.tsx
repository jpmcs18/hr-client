import { useDispatch, useSelector } from 'react-redux';
import { totalSteps } from '../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import {
  insertSalaryGradeBatch,
  updateSalaryGradeBatch,
} from '../../repositories/salary-grade-batch-queries';
import { salaryGradeBatchActions } from '../../state/reducers/salary-grade-batch-reducer';
import { salaryGradeModalActions } from '../../state/reducers/salary-grade-modal-reducer';
import { RootState } from '../../state/store';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomNumber from '../components/custom-number';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManageSalaryGrade() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const salaryGradeModalState = useSelector(
    (state: RootState) => state.salaryGradeModal
  );
  function onModalClose(hasChange: boolean) {
    dispatch(salaryGradeModalActions.setShowModal(false));
    if (hasChange) dispatch(salaryGradeBatchActions.setInitiateSearch(true));
  }
  async function saveData() {
    setBusy(true);
    if (salaryGradeModalState.salaryGradeBatch.id > 0) {
      await updateSalaryGradeBatch({
        ...salaryGradeModalState.salaryGradeBatch,
        salaryGradeItems: salaryGradeModalState.salaryGradeItems.flat(),
      })
        .then((res) => {
          if (res) {
            setToasterMessage({
              content: 'Salary grade batch has been updated.',
            });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertSalaryGradeBatch({
        ...salaryGradeModalState.salaryGradeBatch,
        salaryGradeItems: salaryGradeModalState.salaryGradeItems.flat(),
      })
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({
              content: 'New salary grade batch has been added.',
            });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  return (
    <Modal
      className='salary-grade-modal'
      onClose={() => onModalClose(false)}
      title='Manage Salary Grade'>
      <div className='modal-content-body'>
        <section className='header'>
          <CustomTextBox
            title='Description'
            value={salaryGradeModalState.salaryGradeBatch?.description}
            name='description'
            onChange={(ret) => {
              dispatch(salaryGradeModalActions.updateSalaryGradeBatch(ret));
            }}
          />
          <CustomDateTimePicker
            title='Validity Date (Empty means 1/1/1)'
            type='date'
            value={salaryGradeModalState.salaryGradeBatch.validityDate}
            name='validityDate'
            onChange={(ret) =>
              dispatch(salaryGradeModalActions.updateSalaryGradeBatch(ret))
            }
          />
          <CustomDateTimePicker
            title='Expiry Date (Empty means today upto present)'
            type='date'
            value={salaryGradeModalState.salaryGradeBatch.expiryDate}
            name='expiryDate'
            onChange={(ret) =>
              dispatch(salaryGradeModalActions.updateSalaryGradeBatch(ret))
            }
          />
        </section>
        <section className='table-container salary-grade-table-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th rowSpan={2}>Salary Grade</th>
                <th colSpan={totalSteps} className='align-center'>
                  Steps
                </th>
              </tr>
              <tr>
                {Array.from(Array(totalSteps)).map((x, i) => {
                  return (
                    <th key={i} className='align-center'>
                      {i + 1}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {salaryGradeModalState.salaryGradeItems.map(
                (salaryGradeItems, i) => (
                  <tr key={i}>
                    {salaryGradeItems.map((salaryGradeItem, j) => {
                      if (salaryGradeItem.step === 1) {
                        return (
                          <>
                            <td key={salaryGradeItem.tempId + j.toString()}>
                              {salaryGradeItem.salaryGrade}
                            </td>
                            <td key={salaryGradeItem.tempId}>
                              <CustomNumber
                                type='amount'
                                value={salaryGradeItem.tempAmount}
                                onChange={(ret) =>
                                  dispatch(
                                    salaryGradeModalActions.updateSalaryGrade({
                                      tempId: salaryGradeItem.tempId!,
                                      index: i,
                                      amount: ret.value,
                                    })
                                  )
                                }
                              />
                            </td>
                          </>
                        );
                      }
                      return (
                        <td key={salaryGradeItem.tempId}>
                          <CustomNumber
                            type='amount'
                            value={salaryGradeItem.tempAmount}
                            onChange={(ret) =>
                              dispatch(
                                salaryGradeModalActions.updateSalaryGrade({
                                  tempId: salaryGradeItem.tempId!,
                                  index: i,
                                  amount: ret.value,
                                })
                              )
                            }
                          />
                        </td>
                      );
                    })}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      </div>
      <div className='modal-footer'>
        <button onClick={saveData} className='btn-modal btn-primary'>
          SAVE
        </button>
      </div>
    </Modal>
  );
}
