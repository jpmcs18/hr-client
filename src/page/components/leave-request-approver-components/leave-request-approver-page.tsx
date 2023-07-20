import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchLeaveRequestApprover } from '../../../repositories/leave-request-approver-queries';
import { leaveRequestApproverActions } from '../../../state/reducers/leave-request-approver-reducer';
import { RootState } from '../../../state/store';
import ManageLeaveRequestApprover from '../../modals/manage-leave-request-approver';
import LeaveRequestApproverButtons from './leave-request-approver-buttons';
import LeaveRequestApproverItems from './leave-request-approver-items';

export default function LeaveRequestApproverPage() {
  const leaveRequestApproverModalState = useSelector(
    (state: RootState) => state.leaveRequestApproverModal
  );
  const leaveRequestApproverState = useSelector(
    (state: RootState) => state.leaveRequestApprover
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchOff();
    },
    //eslint-disable-next-line
    [leaveRequestApproverState.initiateSearch]
  );

  async function searchOff() {
    if (!leaveRequestApproverState.initiateSearch) return;
    dispatch(leaveRequestApproverActions.setInitiateSearch(false));
    setBusy(true);
    await searchLeaveRequestApprover(leaveRequestApproverState.currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(leaveRequestApproverActions.fill(res.results));
          dispatch(leaveRequestApproverActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.LeaveRequestApprovers}</div>
      </section>
      <LeaveRequestApproverButtons />
      <LeaveRequestApproverItems />
      {leaveRequestApproverModalState.isModalShow && (
        <ManageLeaveRequestApprover />
      )}
    </>
  );
}
