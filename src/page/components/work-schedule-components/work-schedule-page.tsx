import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchWorkSchedule } from '../../../repositories/work-schedule-queries';
import { workScheduleActions } from '../../../state/reducers/work-schedule-reducer';
import { RootState } from '../../../state/store';
import ManageWorkSchedule from '../../modals/manage-work-schedule';
import ManageWorkScheduleEmployee from '../../modals/work-schedule-employee-components/manage-work-schedule-employee';
import CustomDateTimePicker from '../custom-datetime-picker';
import WorkScheduleButtons from './work-schedule-buttons';
import WorkScheduleItems from './work-schedule-items';

export default function WorkSchedulePage() {
  const workScheduleModalState = useSelector(
    (state: RootState) => state.workScheduleModal
  );
  const workScheduleEmployeeModalState = useSelector(
    (state: RootState) => state.workScheduleEmployeeModal
  );
  const workScheduleState = useSelector(
    (state: RootState) => state.workSchedule
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchDes();
    },
    //eslint-disable-next-line
    [workScheduleState.initiateSearch]
  );

  async function searchDes() {
    if (!workScheduleState.initiateSearch) return;
    dispatch(workScheduleActions.setInitiateSearch(false));
    setBusy(true);
    await searchWorkSchedule(
      workScheduleState.startDate,
      workScheduleState.endDate,
      workScheduleState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(workScheduleActions.fill(res.results));
          dispatch(workScheduleActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function search() {
    dispatch(workScheduleActions.setCurrentPage(1));
    dispatch(workScheduleActions.setInitiateSearch(true));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.WorkSchedules}</div>
      </section>
      <section className='search-main-container'>
        <CustomDateTimePicker
          type='date'
          title='Start Date'
          value={workScheduleState.startDate}
          onChange={(ret) =>
            dispatch(workScheduleActions.setStartDate(ret.value))
          }
        />
        <CustomDateTimePicker
          type='date'
          title='End Date'
          value={workScheduleState.endDate}
          onChange={(ret) =>
            dispatch(workScheduleActions.setEndDate(ret.value))
          }
        />
        <FontAwesomeIcon
          icon={faSearch}
          onClick={search}
          className='search-icon'
        />
      </section>
      <WorkScheduleButtons />
      <WorkScheduleItems />
      {workScheduleModalState.isModalShow && <ManageWorkSchedule />}
      {workScheduleEmployeeModalState.isModalShow && (
        <ManageWorkScheduleEmployee />
      )}
    </>
  );
}
