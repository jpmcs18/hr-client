import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchOffice } from '../../../repositories/office-queries';
import { officeActions } from '../../../state/reducers/office-reducer';
import { RootState } from '../../../state/store';
import ManageOffice from '../../modals/manage-office';
import SearchBar from '../searchbar';
import OfficeButtons from './office-buttons';
import OfficeItems from './office-items';

export default function OfficePage() {
  const officeModalState = useSelector((state: RootState) => state.officeModal);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const [key, setKey] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(
    () => {
      console.log('call');
      searchDes();
    },
    //eslint-disable-next-line
    [key, currentPage]
  );

  async function searchDes() {
    setBusy(true);
    console.log(key, currentPage);
    await searchOffice(key, currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(officeActions.fill(res.results));
          setPageCount(() => res.pageCount);
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    setKey((x) => key);
    setCurrentPage((x) => 1);
  }
  async function onModalClose(hasChanges: boolean) {
    if (hasChanges) searchDes();
  }
  async function nextPage(page: number) {
    setCurrentPage(() => page);
  }
  async function onDelete() {}
  return (
    <>
      <section>
        <SearchBar search={search} placeholder='Search Key' value={key} />
      </section>
      <OfficeButtons
        onNextPage={nextPage}
        onDelete={onDelete}
        page={currentPage}
        pageCount={pageCount}
      />
      <OfficeItems />
      {officeModalState.isModalShow && <ManageOffice onClose={onModalClose} />}
    </>
  );
}
