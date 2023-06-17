import { useDispatch, useSelector } from 'react-redux';
import { useSetBusy } from '../../custom-hooks/authorize-provider';
import { toCommaSeparateAmount, toDate } from '../../helper';
import { employeeLeaveCreditsHistoryModalActions } from '../../state/reducers/employee-leave-credits-history-modal-reducer';
import { RootState } from '../../state/store';
import Pagination from '../components/pagination';
import Modal from './modal';
import { useEffect } from 'react';
import { getEmployeeLeaveCredits } from '../../repositories/employee-leave-credits-queries';
import { searchEmployeeLeaveCreditsHistory } from '../../repositories/employee-leave-credits-history-queries';

export default function EmployeeLeaveCreditsHistoryModal() {
  const dispatch = useDispatch();
  const employeeLeaveCreditsHistoryModalState = useSelector(
    (state: RootState) => state.employeeLeaveCreditsHistoryModal
  );
  const setBusy = useSetBusy();
  function onModalClose() {
    dispatch(employeeLeaveCreditsHistoryModalActions.setShowModal(false));
  }
  useEffect(
    () => {
      if (employeeLeaveCreditsHistoryModalState.initiateSearch) {
        dispatch(
          employeeLeaveCreditsHistoryModalActions.setInitiateSearch(false)
        );
        fetchLeaveCreditsHistory();
      }
    },
    //eslint-disable-next-line
    [employeeLeaveCreditsHistoryModalState.initiateSearch]
  );
  async function fetchLeaveCreditsHistory() {
    setBusy(true);
    await searchEmployeeLeaveCreditsHistory(
      employeeLeaveCreditsHistoryModalState.employeeLeaveCredits?.employeeId!,
      employeeLeaveCreditsHistoryModalState.employeeLeaveCredits?.leaveTypeId!,
      employeeLeaveCreditsHistoryModalState.currentPage
    )
      .then((res) => {
        if (res) {
          dispatch(employeeLeaveCreditsHistoryModalActions.fill(res.results));
          dispatch(
            employeeLeaveCreditsHistoryModalActions.setPageCount(res.pageCount)
          );
        }
      })
      .finally(() => setBusy(false));
  }
  function nextPage(page: number) {
    dispatch(employeeLeaveCreditsHistoryModalActions.setCurrentPage(page));
    dispatch(employeeLeaveCreditsHistoryModalActions.setInitiateSearch(true));
  }
  return (
    <Modal
      className='leave-credits-history-modal'
      onClose={onModalClose}
      title='Leave Credits History'>
      <div className='modal-content-body leave-credits-history-modal-content-body'>
        <div>
          <Pagination
            pages={employeeLeaveCreditsHistoryModalState.pageCount}
            currentPageNumber={
              employeeLeaveCreditsHistoryModalState.currentPage
            }
            goInPage={nextPage}></Pagination>
        </div>
        <div className='table-container employee-history-table-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th style={{ minWidth: '10em' }}>Date</th>
                <th style={{ minWidth: '20em' }}>Source</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {employeeLeaveCreditsHistoryModalState.employeeLeaveCreditsHistory.map(
                (history) => (
                  <tr key={history.id}>
                    <td>{toDate(history.date)}</td>
                    <td>{history.source}</td>
                    <td>{toCommaSeparateAmount(history.credits.toString())}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
