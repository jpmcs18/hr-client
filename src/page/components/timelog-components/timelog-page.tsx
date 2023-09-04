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
import { getTimeLogs } from '../../../repositories/timelog-queries';
import TimeLogSearch from './timelog-search';
import ManageTimeLog from '../../modals/manage-timelog';

export default function TimeLogPage() {
  const timelogState = useSelector((state: RootState) => state.timelog);
  const timeloModalState = useSelector(
    (state: RootState) => state.timelogModal
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      if (timelogState.initiateSearch) {
        fetchEmployees();
      }
    },
    //eslint-disable-next-line
    [timelogState.initiateSearch]
  );
  useEffect(
    () => {
      if (timelogState.refreshTimelog) {
        fetchTimeLogs();
      }
    },
    //eslint-disable-next-line
    [timelogState.refreshTimelog]
  );
  useEffect(
    () => {
      var d = new Date(timelogState.endDate);
      d.setDate(d.getDate() - 15);
      dispatch(timelogActions.setStartDate(d));
    },
    //eslint-disable-next-line
    []
  );

  async function fetchEmployees() {
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

  async function fetchTimeLogs() {
    setBusy(true);
    dispatch(timelogActions.setRefreshTimelog(false));
    await getTimeLogs(
      timelogState.selectedEmployee?.id ?? 0,
      timelogState.startDate,
      timelogState.endDate
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(timelogActions.setTimeLogs(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => {
        setBusy(false);
      });
  }

  function search(key: string) {
    dispatch(timelogActions.setkey(key));
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
      <SearchBar search={search} value={timelogState.key} />
      <section className='timelog-main-container'>
        <div className='employee-container'>
          <Pagination
            pages={timelogState.pageCount}
            currentPageNumber={timelogState.currentPage}
            goInPage={nextPage}></Pagination>
          <EmployeeItems />
        </div>
        <div className='timelog-container'>
          <TimeLogSearch />
          <TimeLogButtons />
          <TimeLogItems />
        </div>
      </section>
      {timeloModalState.isModalShow && <ManageTimeLog />}
    </>
  );
}
