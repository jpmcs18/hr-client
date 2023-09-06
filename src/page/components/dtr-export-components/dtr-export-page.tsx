import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchEmployeeWithTimeLog } from '../../../repositories/employee-queries';
import { searchOfficeWithTimeLog } from '../../../repositories/office-queries';
import { dtrExportActions } from '../../../state/reducers/dtr-export-reducer';
import { RootState } from '../../../state/store';
import DTRExportButtons from './dtr-export-buttons';
import DTRExportSearch from './dtr-export-search';
import EmployeeButtons from './employee-buttons';
import EmployeeItems from './employee-items';
import OfficeButtons from './office-buttons';
import OfficeItems from './office-items';

export default function DTRExportPage() {
  const dtrExportState = useSelector((state: RootState) => state.dtrExport);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      if (dtrExportState.officeSearch.initiateSearch) {
        fetchOffices();
      }
    },
    //eslint-disable-next-line
    [dtrExportState.officeSearch.initiateSearch]
  );

  useEffect(
    () => {
      if (dtrExportState.employeeSearch.initiateSearch) {
        fetchEmployees();
      }
    },
    //eslint-disable-next-line
    [dtrExportState.employeeSearch.initiateSearch]
  );

  async function fetchOffices() {
    dispatch(
      dtrExportActions.setOfficeSearch({
        elementName: 'initiateSearch',
        value: false,
      })
    );

    setBusy(true);
    await searchOfficeWithTimeLog(
      dtrExportState.startDate,
      dtrExportState.endDate,
      dtrExportState.officeSearch.currentPage
    )
      .then((res) => {
        if (res) {
          dispatch(dtrExportActions.setOffices(res.results));
          dispatch(
            dtrExportActions.setOfficeSearch({
              elementName: 'pageCount',
              value: res.pageCount,
            })
          );
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }

  async function fetchEmployees() {
    dispatch(
      dtrExportActions.setEmployeeSearch({
        elementName: 'initiateSearch',
        value: false,
      })
    );

    setBusy(true);
    await searchEmployeeWithTimeLog(
      dtrExportState.selectedOffice?.id ?? 0,
      dtrExportState.startDate,
      dtrExportState.endDate,
      dtrExportState.officeSearch.currentPage
    )
      .then((res) => {
        if (res) {
          dispatch(dtrExportActions.setEmployees(res.results));
          dispatch(
            dtrExportActions.setEmployeeSearch({
              elementName: 'pageCount',
              value: res.pageCount,
            })
          );
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }

  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.DTRExport}</div>
      </section>
      <div className='dtr-main-container'>
        <DTRExportSearch />
        <DTRExportButtons />
        <div className='dtr-table-container'>
          <div className='office-container'>
            <OfficeButtons />
            <OfficeItems />
          </div>
          <div className='employee-container'>
            <EmployeeButtons />
            <EmployeeItems />
          </div>
        </div>
      </div>
    </>
  );
}
