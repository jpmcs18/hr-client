import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dtrExportActions } from '../../../state/reducers/dtr-export-reducer';
import { RootState } from '../../../state/store';
import CustomDateTimePicker from '../custom-datetime-picker';

export default function DTRExportSearch() {
  const dtrExportState = useSelector((state: RootState) => state.dtrExport);
  const dispatch = useDispatch();
  return (
    <div className='search-main-container'>
      <CustomDateTimePicker
        value={dtrExportState.startDate}
        title='Start Date'
        type='date'
        onChange={(ret) => dispatch(dtrExportActions.setStartDate(ret.value))}
      />
      <CustomDateTimePicker
        value={dtrExportState.endDate}
        title='End Date'
        type='date'
        onChange={(ret) => dispatch(dtrExportActions.setEndDate(ret.value))}
      />
      <FontAwesomeIcon
        icon={faSearch}
        className='search-icon'
        onClick={() =>
          dispatch(
            dtrExportActions.setOfficeSearch({
              elementName: 'initiateSearch',
              value: true,
            })
          )
        }
      />
    </div>
  );
}
