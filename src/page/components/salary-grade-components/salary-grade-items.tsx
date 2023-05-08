import { useDispatch, useSelector } from 'react-redux';
import { salaryGradeBatchActions } from '../../../state/reducers/salary-grade-batch-reducer';
import { RootState } from '../../../state/store';
import SalaryGradeItem from './salary-grade-item';

export default function SalaryGradeItems() {
  const dispatch = useDispatch();
  const salaryGradeBatchState = useSelector(
    (state: RootState) => state.salaryGradeBatch
  );
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Valid Date</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {salaryGradeBatchState.salaryGradeBatches.map((salaryGradeBatch) => (
            <tr
              onClick={() =>
                dispatch(salaryGradeBatchActions.setSelected(salaryGradeBatch))
              }
              key={salaryGradeBatch.id}
              className={
                salaryGradeBatchState.selectedSalaryGradeBatch?.id ===
                salaryGradeBatch.id
                  ? 'selected'
                  : ''
              }>
              <SalaryGradeItem salaryGradeBatch={salaryGradeBatch} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
