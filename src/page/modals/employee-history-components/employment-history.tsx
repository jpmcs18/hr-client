import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess, toDate, toDisplayAmount } from '../../../helper';
import { deleteEmployeeHistory } from '../../../repositories/employee-history-queries';
import { employeeHistoryModalActions } from '../../../state/reducers/employee-history-modal-reducer';
import { serviceRecordModalActions } from '../../../state/reducers/service-record-modal-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../../components/pagination';
import ManageServiceRecord from '../manage-service-record';

export default function EmploymentHistory() {
  const employeeHistoryModalState = useSelector(
    (state: RootState) => state.employeeHistoryModal
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const serviceRecordModalState = useSelector(
    (state: RootState) => state.serviceRecordModal
  );
  const dispatch = useDispatch();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  function addHistory() {
    dispatch(
      serviceRecordModalActions.setEmployeeHistory({
        id: 0,
        employeeId: employeeHistoryModalState.employee?.id ?? 0,
      })
    );
    dispatch(serviceRecordModalActions.setShowModal(true));
  }
  function editHistory() {
    dispatch(
      serviceRecordModalActions.setEmployeeHistory(
        employeeHistoryModalState.selectedEmployeeHistory
      )
    );
    dispatch(serviceRecordModalActions.setShowModal(true));
  }
  async function deleteHistory() {
    if (!employeeHistoryModalState.selectedEmployeeHistory?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteEmployeeHistory(
          employeeHistoryModalState.selectedEmployeeHistory?.id ?? 0
        )
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected service record has been deleted',
              });
              dispatch(
                employeeHistoryModalActions.setEmployeeHistorySearch({
                  elementName: 'initiateSearch',
                  value: true,
                })
              );
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .finally(() => setBusy(false));
      },
    });
  }
  return (
    <>
      <section className='btn-actions-group-container'>
        <div className='btn-actions-group'>
          {hasAccess(
            userProfileState.moduleRights,
            Pages.ServiceRecord,
            'Add',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button className='btn-action' title='Add' onClick={addHistory}>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          )}
          {hasAccess(
            userProfileState.moduleRights,
            Pages.ServiceRecord,
            'Edit',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button
              className='btn-action'
              disabled={!employeeHistoryModalState.selectedEmployeeHistory}
              onClick={editHistory}
              title='Edit'>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
          {hasAccess(
            userProfileState.moduleRights,
            Pages.ServiceRecord,
            'Delete',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button
              className='btn-action'
              disabled={!employeeHistoryModalState.selectedEmployeeHistory}
              onClick={deleteHistory}
              title='Delete'>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>

        <Pagination
          pages={employeeHistoryModalState.employeeHistorySearch.pageCount}
          currentPageNumber={
            employeeHistoryModalState.employeeHistorySearch.currentPage
          }
          goInPage={(page) => {
            dispatch(
              employeeHistoryModalActions.setEmployeeHistorySearch({
                elementName: 'currentPage',
                value: page,
              })
            );
            dispatch(
              employeeHistoryModalActions.setEmployeeHistorySearch({
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
              <th style={{ minWidth: '15em' }}>Inclusive Date</th>
              <th>Employment Type</th>
              <th style={{ minWidth: '15em' }}>Office</th>
              <th style={{ minWidth: '10em' }}>Position</th>
              <th>Salary Per Annum</th>
            </tr>
          </thead>
          <tbody>
            {employeeHistoryModalState.employeeHistories.map((history) => (
              <tr
                onClick={() =>
                  dispatch(
                    employeeHistoryModalActions.setSelectedEmployeeHistory(
                      history
                    )
                  )
                }
                key={history.id}
                className={
                  employeeHistoryModalState.selectedEmployeeHistory?.id ===
                  history.id
                    ? 'selected'
                    : ''
                }>
                <td>
                  {toDate(history.startDate)} -{' '}
                  {history.endDate ? toDate(history.endDate) : 'PRESENT'}
                </td>
                <td>{history.natureOfEmployment?.description}</td>
                <td>
                  <div>{history.office?.description}</div>
                  {history.detailedOffice && (
                    <i>
                      <b>Detailed:</b> {history.detailedOffice?.description}
                    </i>
                  )}
                </td>
                <td>
                  <div>{history.position?.description}</div>
                  {history.detailedPosition && (
                    <i>
                      <b>Detailed:</b> {history.detailedPosition?.description}
                    </i>
                  )}
                </td>
                <td align='right'>
                  {toDisplayAmount(history.salary?.toString())}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <>{serviceRecordModalState.isModalShow && <ManageServiceRecord />}</>
    </>
  );
}
