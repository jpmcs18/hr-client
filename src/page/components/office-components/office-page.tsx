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
    [key, currentPage]
  );

  async function searchOff() {
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
    if (hasChanges) searchOff();
  }
  async function nextPage(page: number) {
    setCurrentPage(() => page);
  }
  async function onDelete() {
    if (!officeState.selectedOffice?.id) return;

    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteOffice(officeState.selectedOffice?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected office has been deleted',
              });
              searchOff();
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .then(() => setBusy(false));
      },
    });
  }
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
