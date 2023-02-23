import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchEmployee } from '../../../repositories/employee-queries';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import ManageEmployee from '../../modals/manage-employee';
import SearchBar from '../searchbar';
import EmployeeButtons from './employee-buttons';
import EmployeeItems from './employee-items';

export default function EmployeePage() {
  const employeeModalState = useSelector(
    (state: RootState) => state.employeeModal
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
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
    await searchEmployee(key, currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(employeeActions.fill(res.results));
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
    searchOff();
  }
  return (
    <>
      <section>
        <SearchBar search={search} placeholder='Search Key' value={key} />
      </section>
      <EmployeeButtons
        onNextPage={nextPage}
        onDelete={onDelete}
        page={currentPage}
        pageCount={pageCount}
      />
      <EmployeeItems />
      {employeeModalState.isModalShow && (
        <ManageEmployee onClose={onModalClose} />
      )}
    </>
  );
}
