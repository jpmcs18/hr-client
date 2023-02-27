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
  const designationModalState = useSelector(
    (state: RootState) => state.designationModal
  );
  const designationState = useSelector((state: RootState) => state.designation);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchDes();
    },
    //eslint-disable-next-line
    [designationState.initiateSearch]
  );

  async function searchDes() {
    if (!designationState.initiateSearch) return;
    dispatch(designationActions.setInitiateSearch(false));
    setBusy(true);
    await searchDesignation(designationState.key, designationState.currentPage)
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
    dispatch(designationActions.setkey(key));
    dispatch(designationActions.setCurrentPage(1));
    dispatch(designationActions.setInitiateSearch(true));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>Designations</div>
      </section>
      <section>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={designationState.key}
        />
      </section>
      <DesignationButtons />
      <DesignationItems />
      {designationModalState.isModalShow && <ManageDesignation />}
    </>
  );
}
