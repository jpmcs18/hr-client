import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dtrExportActions } from '../../../state/reducers/dtr-export-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function OfficeButtons() {
  const dtrExportState = useSelector((state: RootState) => state.dtrExport);
  const dispatch = useDispatch();
  return (
    <div className='btn-actions-group-container'>
      <div></div>
      <Pagination
        pages={dtrExportState.officeSearch.pageCount}
        currentPageNumber={dtrExportState.officeSearch.currentPage}
        goInPage={(page) => {
          dispatch(
            dtrExportActions.setOfficeSearch({
              elementName: 'currentPage',
              value: page,
            })
          );
          dispatch(
            dtrExportActions.setOfficeSearch({
              elementName: 'initiateSearch',
              value: true,
            })
          );
        }}></Pagination>
    </div>
  );
}
