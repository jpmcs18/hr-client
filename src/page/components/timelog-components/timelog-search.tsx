import React from 'react';
import CustomDateTimePicker from '../custom-datetime-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { useDispatch } from 'react-redux';
import { timelogActions } from '../../../state/reducers/timelog-reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function TimeLogSearch() {
  const timelogState = useSelector((state: RootState) => state.timelog);
  const dispatch = useDispatch();
  return (
    <div className='search-main-container'>
      <CustomDateTimePicker
        value={timelogState.startDate}
        title='Start Date'
        type='date'
        onChange={(ret) => dispatch(timelogActions.setStartDate(ret.value))}
      />
      <CustomDateTimePicker
        value={timelogState.endDate}
        title='End Date'
        type='date'
        onChange={(ret) => dispatch(timelogActions.setEndDate(ret.value))}
      />
      <FontAwesomeIcon
        icon={faSearch}
        className='search-icon'
        onClick={() => dispatch(timelogActions.setRefreshTimelog(true))}
      />
    </div>
  );
}
