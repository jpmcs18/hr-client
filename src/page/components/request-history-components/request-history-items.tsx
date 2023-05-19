import { useDispatch, useSelector } from 'react-redux';
import { requestHistoryActions } from '../../../state/reducers/request-history-reducer';
import { RootState } from '../../../state/store';
import RequestHistoryItem from './request-history-item';

export default function RequestHistoryItems() {
  const dispatch = useDispatch();
  const requestHistoryState = useSelector(
    (state: RootState) => state.requestHistory
  );
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee</th>
            <th>Type</th>
            <th>Purpose</th>
            <th>Prepared By</th>
          </tr>
        </thead>
        <tbody>
          {requestHistoryState.requestHistories.map((requestHistory) => (
            <tr
              onClick={() =>
                dispatch(requestHistoryActions.setSelected(requestHistory))
              }
              key={requestHistory.id}
              className={
                requestHistoryState.selectedRequestHistory?.id ===
                requestHistory.id
                  ? 'selected'
                  : ''
              }>
              <RequestHistoryItem requestHistory={requestHistory} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
