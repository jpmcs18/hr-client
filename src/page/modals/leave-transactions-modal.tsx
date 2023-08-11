import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { toCommaSeparateAmount, toDate } from '../../helper';
import { searchEmployeeLeaveRequests } from '../../repositories/leave-request-queries';
import { getLeaveRequestStatuses } from '../../repositories/leave-request-status-queries';
import { getLeaveRequestTypes } from '../../repositories/leave-request-type-queries';
import { leaveTransactionActions } from '../../state/reducers/leave-transaction-reducer';
import { RootState } from '../../state/store';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomDropdown from '../components/custom-dropdown';
import CustomTextBox from '../components/custom-textbox';
import Pagination from '../components/pagination';
import Modal from './modal';

export default function LeaveTransactionsModal() {
  const leaveTransactionState = useSelector(
    (state: RootState) => state.leaveTransaction
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const userProfile = useSelector((state: RootState) => state.userProfile);

  useEffect(
    () => {
      if (leaveTransactionState.initiateSearch) {
        fetchLeaveRequests();
      }
    },
    //eslint-disable-next-line
    [leaveTransactionState.initiateSearch]
  );
  useEffect(
    () => {
      fetchLeaveRequestTypes();
      fetchLeaveRequestStatuses();
    },
    //eslint-disable-next-line
    []
  );

  async function fetchLeaveRequestTypes() {
    setBusy(true);
    await getLeaveRequestTypes()
      .then((res) => {
        if (res) {
          dispatch(leaveTransactionActions.setLeaveRequestTypes(res));
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }

  async function fetchLeaveRequestStatuses() {
    setBusy(true);
    await getLeaveRequestStatuses()
      .then((res) => {
        if (res) {
          dispatch(leaveTransactionActions.setLeaveRequestStatuses(res));
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }
  async function fetchLeaveRequests() {
    dispatch(leaveTransactionActions.setInitiateSearch(false));
    setBusy(true);
    await searchEmployeeLeaveRequests(
      userProfile.systemUser?.employeeId ?? 0,
      leaveTransactionState.key,
      leaveTransactionState.selectedLeaveRequestStatus,
      leaveTransactionState.selectedLeaveRequestType,
      leaveTransactionState.startDate,
      leaveTransactionState.endDate,
      leaveTransactionState.currentPage
    )
      .then((res) => {
        if (res) {
          dispatch(leaveTransactionActions.fill(res.results));
          dispatch(leaveTransactionActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  async function search() {
    dispatch(leaveTransactionActions.setCurrentPage(1));
    dispatch(leaveTransactionActions.setInitiateSearch(true));
  }
  function nextPage(page: number) {
    dispatch(leaveTransactionActions.setCurrentPage(page));
    dispatch(leaveTransactionActions.setInitiateSearch(true));
  }
  function onModalClose() {
    dispatch(leaveTransactionActions.setShowModal(false));
  }
  return (
    <Modal
      onClose={onModalClose}
      className='leave-transaction-modal'
      title='Leave Transactions'>
      <div className='modal-content-body leave-transaction-body'>
        <div className='search-main-container'>
          <CustomTextBox
            title='Reference No'
            value={leaveTransactionState.key}
            onChange={(ret) =>
              dispatch(leaveTransactionActions.setkey(ret.value))
            }
          />
          <CustomDropdown
            title='Request Status'
            value={leaveTransactionState.selectedLeaveRequestStatus}
            onChange={(res) =>
              dispatch(
                leaveTransactionActions.setSelectedLeaveRequestStatus(res.value)
              )
            }
            itemsList={leaveTransactionState.leaveRequestStatuses.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
          <CustomDropdown
            title='Request Type'
            value={leaveTransactionState.selectedLeaveRequestType}
            onChange={(res) =>
              dispatch(
                leaveTransactionActions.setSelectedLeaveRequestType(res.value)
              )
            }
            itemsList={leaveTransactionState.leaveRequestTypes.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
          <CustomDateTimePicker
            type='date'
            title='Start Date'
            onChange={(res) =>
              dispatch(leaveTransactionActions.setStartDate(res.value))
            }
            value={leaveTransactionState.startDate}
          />
          <CustomDateTimePicker
            type='date'
            title='End Date'
            onChange={(res) =>
              dispatch(leaveTransactionActions.setEndDate(res.value))
            }
            value={leaveTransactionState.endDate}
          />
          <FontAwesomeIcon
            icon={faSearch}
            onClick={search}
            className='search-icon'
          />
        </div>
        <section className='btn-actions-group-container'>
          <div></div>
          <Pagination
            pages={leaveTransactionState.pageCount}
            currentPageNumber={leaveTransactionState.currentPage}
            goInPage={nextPage}></Pagination>
        </section>
        <div className='table-container leave-request-table-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No</th>
                <th>Request Type</th>
                <th>Leave Type</th>
                <th>Inclusive Date</th>
                <th>Day/s</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveTransactionState.leaveRequests.map((leaveRequest) => (
                <tr key={leaveRequest.id}>
                  <td>{toDate(leaveRequest.requestDate)}</td>
                  <td>{leaveRequest.referenceNo}</td>
                  <td>{leaveRequest.leaveRequestType?.description}</td>
                  <td>
                    {leaveRequest.leaveRequestType?.leaveType?.description}
                  </td>
                  <td>
                    {toDate(leaveRequest.startDate) +
                      (!leaveRequest.isMultipleDays
                        ? ''
                        : ` - ${toDate(leaveRequest.endDate)}`)}
                  </td>
                  <td>
                    {toCommaSeparateAmount(
                      leaveRequest.totalLeaveCredits?.toString()
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span
                      className={
                        leaveRequest.leaveRequestStatus?.description?.toLowerCase() +
                        ' leave-status'
                      }>
                      {leaveRequest.leaveRequestStatus?.description}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
