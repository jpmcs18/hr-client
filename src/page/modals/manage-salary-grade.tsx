import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    if (!salaryGradeModalState.salaryGradeBatch.description) {
      setToasterMessage({ content: 'Please fill description' });
      return;
    }

    setBusy(true);
    if (salaryGradeModalState.salaryGradeBatch.id > 0) {
      await updateSalaryGradeBatch({
        ...salaryGradeModalState.salaryGradeBatch,
        salaryGradeItems: salaryGradeModalState.salaryGradeItems.flat(),
      })
        .then((res) => {
          if (res) {
            setToasterMessage({
              content: 'Salary grade batch updated.',
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
              content: 'New salary grade batch added.',
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
        <div className='header'>
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
        </div>
        <div className='table-container salary-grade-table-container'>
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
                    <td>{i + 1}</td>
                    {salaryGradeItems.map((salaryGradeItem, j) => (
                      <td key={salaryGradeItem.tempId}>
                        <CustomNumber
                          type='amount'
                          value={salaryGradeItem.amount}
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
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
