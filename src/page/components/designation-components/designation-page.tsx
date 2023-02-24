import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import {
  deleteDesignation,
  searchDesignation,
} from '../../../repositories/designation-queries';
import { designationActions } from '../../../state/reducers/designation-reducer';
import { RootState } from '../../../state/store';
import ManageDesignation from '../../modals/manage-designation';
import SearchBar from '../searchbar';
import DesignationButtons from './designation-buttons';
import DesignationItems from './designation-items';

export default function DesignationPage() {
  const designationModalState = useSelector(
    (state: RootState) => state.designationModal
  );
  const designationState = useSelector((state: RootState) => state.designation);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const [key, setKey] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(
    () => {
      searchDes();
    },
    //eslint-disable-next-line
    [key, currentPage]
  );

  async function searchDes() {
    setBusy(true);
    await searchDesignation(key, currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(designationActions.fill(res.results));
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
  async function onDelete() {
    if (!designationState.selectedDesignation?.id) return;

    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteDesignation(designationState.selectedDesignation?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected designation has been deleted',
              });
              searchDes();
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
      <section className='title-container'>
        <div className='title'>Designations</div>
      </section>
      <section>
        <SearchBar search={search} placeholder='Search Key' value={key} />
      </section>
      <DesignationButtons
        onNextPage={nextPage}
        onDelete={onDelete}
        page={currentPage}
        pageCount={pageCount}
      />
      <DesignationItems />
      {designationModalState.isModalShow && (
        <ManageDesignation onClose={onModalClose} />
      )}
    </>
  );
}
