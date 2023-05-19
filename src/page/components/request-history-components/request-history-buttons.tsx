import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { requestHistoryActions } from '../../../state/reducers/request-history-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function RequestHistoryButtons() {
  const requestHistoryState = useSelector(
    (state: RootState) => state.requestHistory
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
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
