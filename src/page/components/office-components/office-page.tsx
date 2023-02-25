import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import {
  deleteOffice,
  searchOffice,
} from '../../../repositories/office-queries';
import { officeActions } from '../../../state/reducers/office-reducer';
import { RootState } from '../../../state/store';
import ManageOffice from '../../modals/manage-office';
import SearchBar from '../searchbar';
import OfficeButtons from './office-buttons';
import OfficeItems from './office-items';

export default function OfficePage() {
  const officeModalState = useSelector((state: RootState) => state.officeModal);
  const officeState = useSelector((state: RootState) => state.office);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const [key, setKey] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(
    () => {
      searchOff();
    },
    //eslint-disable-next-line
    [officeState.initiateSearch]
  );

  async function searchOff() {
    if (!officeState.initiateSearch) return;
    dispatch(officeActions.setInitiateSearch(false));
    setBusy(true);
    await searchOffice(officeState.key, officeState.currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(officeActions.fill(res.results));
          dispatch(officeActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(officeActions.setkey(key));
    dispatch(officeActions.setCurrentPage(1));
    dispatch(officeActions.setInitiateSearch(true));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>Offices</div>
      </section>
      <section>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={officeState.key}
        />
      </section>
      <OfficeButtons />
      <OfficeItems />
      {officeModalState.isModalShow && <ManageOffice />}
    </>
  );
}
