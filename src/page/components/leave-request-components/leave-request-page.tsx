import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchLeaveRequests } from '../../../repositories/leave-request-queries';
import { getLeaveRequestStatuses } from '../../../repositories/leave-request-status-queries';
import { getLeaveRequestTypes } from '../../../repositories/leave-request-type-queries';
import { leaveRequestActions } from '../../../state/reducers/leave-request-reducer';
import { RootState } from '../../../state/store';
import ManageLeaveRequest from '../../modals/manage-leave-request';
import ManageLeaveRequestDisapproval from '../../modals/manage-leave-request-disapproval';
import ManageLeaveRequestApproval from '../../modals/manage-leave-request-approval';
import LeaveRequestButtons from './leave-request-buttons';
import LeaveRequestItems from './leave-request-items';
import LeaveRequestSearch from './leave-request-search';

export default function LeaveRequestPage() {
  const leaveRequestState = useSelector(
    (state: RootState) => state.leaveRequest
  );
  const leaveRequestModalState = useSelector(
    (state: RootState) => state.leaveRequestModal
  );
  const leaveRequestApprovalState = useSelector(
    (state: RootState) => state.leaveRequestApproval
  );
  const leaveRequestDisapprovalState = useSelector(
    (state: RootState) => state.leaveRequestDisapproval
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      fetchLeaveRequests();
    },
    //eslint-disable-next-line
    [leaveRequestState.initiateSearch]
  );

  useEffect(
    () => {
      fetchLeaveRequestTypes();
      fetchLeaveRequestStatuses();
    },
    //eslint-disable-next-line
    []
  );

  async function fetchLeaveRequests() {
    if (!leaveRequestState.initiateSearch) return;
    setBusy(true);
    dispatch(leaveRequestActions.setInitiateSearch(false));
    await searchLeaveRequests(
      leaveRequestState.key,
      leaveRequestState.selectedLeaveRequestStatus,
      leaveRequestState.selectedLeaveRequestType,
      leaveRequestState.startDate,
      leaveRequestState.endDate,
      leaveRequestState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(leaveRequestActions.fill(res.results));
          dispatch(leaveRequestActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => {
        setBusy(false);
      });
  }

  async function fetchLeaveRequestTypes() {
    setBusy(true);
    await getLeaveRequestTypes()
      .then((res) => {
        if (res) {
          dispatch(leaveRequestActions.setLeaveRequestTypes(res));
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
          dispatch(leaveRequestActions.setLeaveRequestStatuses(res));
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.LeaveRequests}</div>
      </section>
      <LeaveRequestSearch />
      <LeaveRequestButtons />
      <LeaveRequestItems />
      {leaveRequestModalState.isModalShow && <ManageLeaveRequest />}
      {leaveRequestApprovalState.isModalShow && <ManageLeaveRequestApproval />}
      {leaveRequestDisapprovalState.isModalShow && (
        <ManageLeaveRequestDisapproval />
      )}
    </>
  );
}
