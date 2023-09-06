import { faFileExport, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pages } from '../../../constant';
import { hasAccess } from '../../../helper';
import { dtrExportActions } from '../../../state/reducers/dtr-export-reducer';
import { RootState } from '../../../state/store';
import CustomDropdown from '../custom-dropdown';
import Pagination from '../pagination';

export default function EmployeeButtons() {
  const dtrExportState = useSelector((state: RootState) => state.dtrExport);
  const dispatch = useDispatch();
  function nextPage(page: number) {
    dispatch(
      dtrExportActions.setEmployeeSearch({
        elementName: 'currentPage',
        value: page,
      })
    );
    dispatch(
      dtrExportActions.setEmployeeSearch({
        elementName: 'initiateSearch',
        value: true,
      })
    );
  }
  return (
    <div className='btn-actions-group-container'>
      <div></div>
      <Pagination
        pages={dtrExportState.employeeSearch.pageCount}
        currentPageNumber={dtrExportState.employeeSearch.currentPage}
        goInPage={nextPage}></Pagination>
    </div>
  );
}
