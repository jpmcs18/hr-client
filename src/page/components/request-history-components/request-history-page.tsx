import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchRequestHistory } from '../../../repositories/request-history-queries';
import { getRequestTypes } from '../../../repositories/request-type-queries';
import { requestHistoryActions } from '../../../state/reducers/request-history-reducer';
import { RootState } from '../../../state/store';
import CustomDropdown from '../custom-dropdown';
import CustomTextBox from '../custom-textbox';
import RequestHistoryButtons from './request-history-buttons';
import RequestHistoryItems from './request-history-items';

export default function RequestHistoryPage() {
  const requestHistoryState = useSelector(
    (state: RootState) => state.requestHistory
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      fetchRequestHistory();
    },
    //eslint-disable-next-line
    [requestHistoryState.initiateSearch]
  );
  useEffect(
    () => {
      fetchRequestTypes();
    },
    //eslint-disable-next-line
    []
  );

  async function fetchRequestHistory() {
    if (!requestHistoryState.initiateSearch) return;
    dispatch(requestHistoryActions.setInitiateSearch(false));
    setBusy(true);
    await searchRequestHistory(
      requestHistoryState.key,
      requestHistoryState.requestTypeId,
      requestHistoryState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(requestHistoryActions.fill(res.results));
          dispatch(requestHistoryActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function fetchRequestTypes() {
    setBusy(true);
    await getRequestTypes()
      .then((res) => {
        if (res !== undefined) {
          dispatch(requestHistoryActions.setRequestTypes(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  function search() {
    dispatch(requestHistoryActions.setCurrentPage(1));
    dispatch(requestHistoryActions.setInitiateSearch(true));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.RequestHistory}</div>
      </section>
      <section className='search-main-container'>
        <CustomDropdown
          title='Request Type'
          value={requestHistoryState.requestTypeId}
          onChange={(ret) =>
            dispatch(requestHistoryActions.setRequestTypeId(ret.value))
          }
          itemsList={requestHistoryState.requestTypes.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomTextBox
          title='Employee'
          value={requestHistoryState.key}
          onChange={(ret) => dispatch(requestHistoryActions.setkey(ret.value))}
        />
        <FontAwesomeIcon
          icon={faSearch}
          onClick={search}
          className='search-icon'
        />
      </section>
      <RequestHistoryButtons />
      <RequestHistoryItems />
    </>
  );
}
