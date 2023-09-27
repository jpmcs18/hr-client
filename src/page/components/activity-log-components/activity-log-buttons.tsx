import { useDispatch, useSelector } from 'react-redux';
import { activityLogActions } from '../../../state/reducers/activity-log-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function ActivityLogButtons() {
  const activityLogState = useSelector((state: RootState) => state.activityLog);
  const dispatch = useDispatch();
  async function nextPage(page: number) {
    dispatch(activityLogActions.setCurrentPage(page));
    dispatch(activityLogActions.setInitiateSearch(true));
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'></div>

      <Pagination
        pages={activityLogState.pageCount}
        currentPageNumber={activityLogState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
