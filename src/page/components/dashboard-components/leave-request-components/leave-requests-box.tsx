import { faTableList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { leaveTransactionActions } from '../../../../state/reducers/leave-transaction-reducer';
import { RootState } from '../../../../state/store';
import LeaveTransactionsModal from '../../../modals/leave-transactions-modal';

export default function LeaveRequestsBox() {
  const leaveTransactionState = useSelector(
    (state: RootState) => state.leaveTransaction
  );
  const dispatch = useDispatch();
  return (
    <>
      <button
        className='box-container'
        onClick={() => {
          dispatch(leaveTransactionActions.setShowModal(true));
        }}>
        <FontAwesomeIcon className='icon' icon={faTableList} />
        <label className='text'>Leave Transactions</label>
      </button>
      {leaveTransactionState.isModalShow && <LeaveTransactionsModal />}
    </>
  );
}
