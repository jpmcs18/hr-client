import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchEmployee } from '../../../repositories/employee-queries';
import { timelogActions } from '../../../state/reducers/timelog-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';
import SearchBar from '../searchbar';
import EmployeeItems from './employee-items';
import TimeLogButtons from './timelog-buttons';
import TimeLogItems from './timelog-items';

export default function TimeLogPage() {
  const timelogState = useSelector((state: RootState) => state.timelog);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      fetchEmployees();
    },
    //eslint-disable-next-line
    [timelogState.initiateSearch]
  );

  async function fetchEmployees() {
    if (!timelogState.initiateSearch) return;
    setBusy(true);
    dispatch(timelogActions.setInitiateSearch(false));
    await searchEmployee(timelogState.key, timelogState.currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(timelogActions.setEmployees(res.results));
          dispatch(timelogActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => {
        setBusy(false);
      });
  }

  function search() {
    dispatch(timelogActions.setCurrentPage(1));
    dispatch(timelogActions.setInitiateSearch(true));
  }
  async function nextPage(page: number) {
    dispatch(timelogActions.setCurrentPage(page));
    dispatch(timelogActions.setInitiateSearch(true));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.TimeLogs}</div>
      </section>
      <SearchBar search={search} />
      <section className='timelog-main-container'>
        <div className='employee-container'>
          <Pagination
            pages={timelogState.pageCount}
            currentPageNumber={timelogState.currentPage}
            goInPage={nextPage}></Pagination>
          <EmployeeItems />
        </div>
        <div className='timelog-container'>
          <TimeLogButtons />
          <TimeLogItems />
        </div>
      </section>
    </>
  );
}
