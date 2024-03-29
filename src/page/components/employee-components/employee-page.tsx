import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchEmployee } from '../../../repositories/employee-queries';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import EmployeeHistoryModal from '../../modals/employee-history-components/employee-history-modal';
import EmployeePromotion from '../../modals/employee-promotion';
import ManageEmployee from '../../modals/manage-employee';
import ManageEmployeeAttachments from '../../modals/manage-employee-attachments';
import SearchBar from '../searchbar';
import EmployeeButtons from './employee-buttons';
import EmployeeItems from './employee-items';

export default function EmployeePage() {
  const employeeModalState = useSelector(
    (state: RootState) => state.employeeModal
  );
  const employeeAttachmentModalState = useSelector(
    (state: RootState) => state.employeeAttachmentModal
  );
  const employeeHistoryModalState = useSelector(
    (state: RootState) => state.employeeHistoryModal
  );
  const employeePromotionState = useSelector(
    (state: RootState) => state.employeePromotion
  );
  const employeeState = useSelector((state: RootState) => state.employee);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchEmp();
    },
    //eslint-disable-next-line
    [employeeState.initiateSearch]
  );

  async function searchEmp() {
    if (!employeeState.initiateSearch) return;
    setBusy(true);
    dispatch(employeeActions.setInitiateSearch(false));
    await searchEmployee(employeeState.key, employeeState.currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(employeeActions.fill(res.results));
          dispatch(employeeActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => {
        setBusy(false);
      });
  }
  async function search(key: string) {
    dispatch(employeeActions.setkey(key));
    dispatch(employeeActions.setCurrentPage(1));
    dispatch(employeeActions.setInitiateSearch(true));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.Employees}</div>
      </section>
      <section>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={employeeState.key}
        />
      </section>
      <EmployeeButtons />
      <EmployeeItems />
      {employeeModalState.isModalShow && <ManageEmployee />}
      {employeeAttachmentModalState.isModalShow && (
        <ManageEmployeeAttachments />
      )}
      {employeePromotionState.isModalShow && <EmployeePromotion />}
      {employeeHistoryModalState.isModalShow && <EmployeeHistoryModal />}
    </>
  );
}
