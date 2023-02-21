import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchDesignation } from '../../../repositories/designation-queries';
import { designationActions } from '../../../state/reducers/designation-reducer';
import { RootState } from '../../../state/store';
import ManageDesignation from '../../modals/manage-designation';
import SearchBar from '../searchbar';
import DesignationButtons from './designation-buttons';
import DesignationItems from './designation-items';

export default function DesignationPage() {
  const designationState = useSelector((state: RootState) => state.designation);
  const designationModalState = useSelector(
    (state: RootState) => state.designationModal
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchDes;
    },
    //eslint-disable-next-line
    []
  );

  async function searchDes() {
    setBusy(true);
    await searchDesignation(
      designationState.searchKey,
      designationState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(designationActions.fill(res.results));
          dispatch(designationActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(designationActions.setSearchKey(key));
    dispatch(designationActions.setCurrentPage(1));
    await searchDes();
  }
  async function onModalClose(hasChanges: boolean) {
    if (hasChanges) searchDes();
  }
  async function nextPage(page: number) {
    dispatch(designationActions.setCurrentPage(page));
    await searchDes();
  }
  async function onDelete() {}
  return (
    <>
      <section>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={designationState.searchKey}
        />
      </section>
      <DesignationButtons onNextPage={nextPage} onDelete={onDelete} />
      <DesignationItems />
      {designationModalState.isModalShow && (
        <ManageDesignation onClose={onModalClose} />
      )}
    </>
  );
}
