import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSetBusy } from '../../custom-hooks/authorize-provider';
import { employeeLeaveCreditsHistoryModalActions } from '../../state/reducers/employee-leave-credits-history-modal-reducer';
import { RootState } from '../../state/store';
import Modal from './modal';

export default function EmployeeLeaveCreditsHistoryModal() {
  const dispatch = useDispatch();
  const employeeLeaveCreditsHistoryModalState = useSelector(
    (state: RootState) => state.employeeLeaveCreditsHistoryModal
  );
  const setBusy = useSetBusy();
  function onModalClose() {
    dispatch(employeeLeaveCreditsHistoryModalActions.setShowModal(false));
  }
  // useEffect(
  //   () => {
  //     fetchEmploymentHistory();
  //     fetchPersonalHistory();
  //   },
  //   //eslint-disable-next-line
  //   [employeeHistoryModalState.employee]
  // );
  // useEffect(
  //   () => {
  //     if (employeeHistoryModalState.employeeHistorySearch.initiateSearch) {
  //       dispatch(
  //         employeeHistoryModalActions.setEmployeeHistorySearch({
  //           elementName: 'initiateSearch',
  //           value: false,
  //         })
  //       );
  //       fetchEmploymentHistory();
  //     }
  //   },
  //   //eslint-disable-next-line
  //   [employeeHistoryModalState.employeeHistorySearch.initiateSearch]
  // );
  // useEffect(
  //   () => {
  //     if (employeeHistoryModalState.personalHistorySearch.initiateSearch) {
  //       dispatch(
  //         employeeHistoryModalActions.setPersonalHistorySearch({
  //           elementName: 'initiateSearch',
  //           value: false,
  //         })
  //       );
  //       fetchPersonalHistory();
  //     }
  //   },
  //   //eslint-disable-next-line
  //   [employeeHistoryModalState.personalHistorySearch.initiateSearch]
  // );
  // async function fetchEmploymentHistory() {
  //   if (employeeHistoryModalState.employee) {
  //     setBusy(true);
  //     await getEmployeeHistories(
  //       employeeHistoryModalState.employee.id,
  //       employeeHistoryModalState.employeeHistorySearch.currentPage
  //     )
  //       .then((res) => {
  //         if (res) {
  //           dispatch(
  //             employeeHistoryModalActions.fillEmployeeHistory(res.results)
  //           );
  //           dispatch(
  //             employeeHistoryModalActions.setEmployeeHistorySearch({
  //               elementName: 'pageCount',
  //               value: res.pageCount,
  //             })
  //           );
  //         }
  //       })
  //       .finally(() => setBusy(false));
  //   }
  // }
  // async function fetchPersonalHistory() {
  //   if (employeeHistoryModalState.employee) {
  //     setBusy(true);
  //     await getPersonalHistories(
  //       employeeHistoryModalState.employee.id,
  //       employeeHistoryModalState.employeeHistorySearch.currentPage
  //     )
  //       .then((res) => {
  //         if (res) {
  //           dispatch(
  //             employeeHistoryModalActions.fillPersonalHistory(res.results)
  //           );
  //           dispatch(
  //             employeeHistoryModalActions.setPersonalHistorySearch({
  //               elementName: 'pageCount',
  //               value: res.pageCount,
  //             })
  //           );
  //         }
  //       })
  //       .finally(() => setBusy(false));
  //   }
  // }
  return (
    <Modal
      className='employee-history-modal'
      onClose={onModalClose}
      title='Leave Credits History'>
      {/* <div className='modal-content-body employee-history-modal-content-body'>
        <section>
          <Pagination
            pages={employeeHistoryModalState.personalHistorySearch.pageCount}
            currentPageNumber={
              employeeHistoryModalState.personalHistorySearch.currentPage
            }
            goInPage={(page) => {
              dispatch(
                employeeHistoryModalActions.setPersonalHistorySearch({
                  elementName: 'currentPage',
                  value: page,
                })
              );

              dispatch(
                employeeHistoryModalActions.setPersonalHistorySearch({
                  elementName: 'initiateSearch',
                  value: true,
                })
              );
            }}></Pagination>
        </section>
        <section className='table-container employee-history-table-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th style={{ minWidth: '10em' }}>Date</th>
                <th style={{ minWidth: '20em' }}>Source</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {employeeHistoryModalState.history.map((history) => (
                <tr
                  onClick={() =>
                    dispatch(
                      employeeHistoryModalActions.setSelectedPersonalHistory(
                        history
                      )
                    )
                  }
                  key={history.id}
                  className={
                    employeeHistoryModalState.selectedPersonalHistory?.id ===
                    history.id
                      ? 'selected'
                      : ''
                  }>
                  <td>
                    {toDate(history.startDate)} -{' '}
                    {history.endDate ? toDate(history.endDate) : 'PRESENT'}
                  </td>
                  <td>{history.fullName}</td>
                  <td>{history.contactNumber}</td>
                  <td>{history.emailAddress}</td>
                  <td>{history.civilStatus?.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div> */}
    </Modal>
  );
}
