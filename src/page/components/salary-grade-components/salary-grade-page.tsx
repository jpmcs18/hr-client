import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchSalaryGradeBatch } from '../../../repositories/salary-grade-batch-queries';
import { salaryGradeBatchActions } from '../../../state/reducers/salary-grade-batch-reducer';
import { RootState } from '../../../state/store';
import ManageSalaryGrade from '../../modals/manage-salary-grade';
import SalaryGradeButtons from './salary-grade-buttons';
import SalaryGradeItems from './salary-grade-items';

export default function SalaryGradePage() {
  const salaryGradeState = useSelector(
    (state: RootState) => state.salaryGradeBatch
  );
  const salaryGradeModalState = useSelector(
    (state: RootState) => state.salaryGradeModal
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      _search();
    },
    //eslint-disable-next-line
    [salaryGradeState.initiateSearch]
  );

  async function _search() {
    if (!salaryGradeState.initiateSearch) return;
    dispatch(salaryGradeBatchActions.setInitiateSearch(false));
    setBusy(true);
    await searchSalaryGradeBatch(salaryGradeState.currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(salaryGradeBatchActions.fill(res.results));
          dispatch(salaryGradeBatchActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.SalaryGrade}</div>
      </section>
      <SalaryGradeButtons />
      <SalaryGradeItems />
      {salaryGradeModalState.isModalShow && <ManageSalaryGrade />}
    </>
  );
}
