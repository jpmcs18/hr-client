import { useState } from 'react';
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
  const employeeState = useSelector((state: RootState) => state.employee);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  async function searchEmp() {
    setBusy(true);
    await searchEmployee(employeeState.searchKey, employeeState.currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(employeeActions.fill(res.results));
          dispatch(employeeActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(employeeActions.setSearchKey(key));
    dispatch(employeeActions.setCurrentPage(1));
    await searchEmp();
  }
  async function onModalClose(hasChanges: boolean) {
    if (hasChanges) searchEmp();
    dispatch(employeeActions.setShowModal(false));
  }
  async function nextPage(page: number) {
    dispatch(employeeActions.setCurrentPage(page));
    await searchEmp();
  }
  return (
    <>
      <section>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={employeeState.searchKey}
        />
      </section>
      <EmployeeButtons onNextPage={nextPage} />
      <EmployeeItems />
      {employeeState.isModalShow && <ManageEmployee onClose={onModalClose} />}
    </>
  );
}
