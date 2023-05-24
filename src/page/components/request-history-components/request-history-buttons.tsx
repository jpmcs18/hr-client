import { useDispatch, useSelector } from 'react-redux';
import { requestHistoryActions } from '../../../state/reducers/request-history-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function RequestHistoryButtons() {
  const requestHistoryState = useSelector(
    (state: RootState) => state.requestHistory
  );
  const dispatch = useDispatch();
  async function nextPage(page: number) {
    dispatch(requestHistoryActions.setCurrentPage(page));
    dispatch(requestHistoryActions.setInitiateSearch(true));
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'></div>

      <Pagination
        pages={requestHistoryState.pageCount}
        currentPageNumber={requestHistoryState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
