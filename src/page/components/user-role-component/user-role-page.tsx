import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import {
  deleteUserRole,
  searchUserRole,
} from '../../../repositories/user-role-queries';
import { userRoleActions } from '../../../state/reducers/user-role-reducer';
import { RootState } from '../../../state/store';
import ManageUserRole from '../../modals/manage-user-role';
import SearchBar from '../searchbar';
import UserRoleButtons from './user-role-buttons';
import UserRoleItems from './user-role-items';

export default function UserRolePage() {
  const userRoleModalState = useSelector(
    (state: RootState) => state.userRoleModal
  );
  const userRoleState = useSelector((state: RootState) => state.userRole);
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
    await searchUserRole(key, currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(userRoleActions.fill(res.results));
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
  return (
    <>
      <section className='title-container'>
        <div className='title'>User Roles</div>
      </section>
      <section>
        <SearchBar search={search} placeholder='Search Key' value={key} />
      </section>
      <UserRoleButtons />
      <UserRoleItems />
      {userRoleModalState.isModalShow && <ManageUserRole />}
    </>
  );
}
