import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import Employee from '../../../models/entities/Employee';
import { searchActivityLog } from '../../../repositories/activity-log-queries';
import { activityLogActions } from '../../../state/reducers/activity-log-reducer';
import { employeeSearchableActions } from '../../../state/reducers/employee-searchable-reducer';
import { RootState } from '../../../state/store';
import EmployeeSearchable from '../../modals/searchables/employee-searchable';
import CustomDateTimePicker from '../custom-datetime-picker';
import CustomSelector from '../custom-selector';
import ActivityLogButtons from './activity-log-buttons';
import ActivityLogItems from './activity-log-items';

export default function ActivityLogPage() {
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );
  const activityLogState = useSelector((state: RootState) => state.activityLog);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      fetchActivityLog();
    },
    //eslint-disable-next-line
    [activityLogState.initiateSearch]
  );
  async function fetchActivityLog() {
    if (!activityLogState.initiateSearch) return;
    dispatch(activityLogActions.setInitiateSearch(false));
    setBusy(true);
    await searchActivityLog(
      activityLogState.startDate,
      activityLogState.endDate,
      activityLogState.employee?.id,
      activityLogState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(activityLogActions.fill(res.results));
          dispatch(activityLogActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  function search() {
    dispatch(activityLogActions.setCurrentPage(1));
    dispatch(activityLogActions.setInitiateSearch(true));
  }
  function onCloseEmployeeSearch(employee: Employee | undefined) {
    dispatch(activityLogActions.setEmployee(employee));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.ActivityLog}</div>
      </section>
      <section className='search-main-container'>
        <CustomDateTimePicker
          value={activityLogState.startDate}
          title='Start Date'
          type='datetime-local'
          onChange={(ret) =>
            dispatch(activityLogActions.setStartDate(ret.value))
          }
        />
        <CustomDateTimePicker
          value={activityLogState.endDate}
          title='End Date'
          type='datetime-local'
          onChange={(ret) => dispatch(activityLogActions.setEndDate(ret.value))}
        />
        <CustomSelector
          title='Employee'
          value={activityLogState.employee?.fullName}
          onSelectorClick={() => {
            dispatch(employeeSearchableActions.setShowModal(true));
            dispatch(employeeSearchableActions.setIsRegular(false));
            dispatch(
              employeeSearchableActions.setOnCloseFunction(
                onCloseEmployeeSearch
              )
            );
          }}
          onClear={() => onCloseEmployeeSearch(undefined)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          onClick={search}
          className='search-icon'
        />
      </section>
      <ActivityLogButtons />
      <ActivityLogItems />
      <>{employeeSearchableState.isModalShow && <EmployeeSearchable />}</>
    </>
  );
}
