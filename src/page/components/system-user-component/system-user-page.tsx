import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import {
  deleteSystemUser,
  searchSystemUser,
} from '../../../repositories/system-user-queries';
import { systemUserActions } from '../../../state/reducers/system-user-reducer';
import { RootState } from '../../../state/store';
import ManageSystemUser from '../../modals/manage-system-user';
import SearchBar from '../searchbar';
import SystemUserButtons from './system-user-buttons';
import SystemUserItems from './system-user-items';

export default function SystemUserPage() {
  const systemUserModalState = useSelector(
    (state: RootState) => state.systemUserModal
  );
  const systemUserState = useSelector((state: RootState) => state.systemUser);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const [key, setKey] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(
    () => {
      searchUsr();
    },
    //eslint-disable-next-line
    [key, currentPage]
  );

  async function searchUsr() {
    setBusy(true);
    await searchSystemUser(key, currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(systemUserActions.fill(res.results));
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
    if (hasChanges) searchUsr();
  }
  async function nextPage(page: number) {
    setCurrentPage(() => page);
  }
  async function onDelete() {
    if (!systemUserState.selectedSystemUser?.id) return;

    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteSystemUser(systemUserState.selectedSystemUser?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected user has been deleted',
              });
              searchUsr();
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
        <div className='title'>Users</div>
      </section>
      <section>
        <SearchBar search={search} placeholder='Search Key' value={key} />
      </section>
      <SystemUserButtons
        onNextPage={nextPage}
        onDelete={onDelete}
        page={currentPage}
        pageCount={pageCount}
      />
      <SystemUserItems />
      {systemUserModalState.isModalShow && (
        <ManageSystemUser onClose={onModalClose} />
      )}
    </>
  );
}
