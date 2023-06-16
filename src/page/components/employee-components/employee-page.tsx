import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchEmployee } from '../../../repositories/employee-queries';
import { getGenders } from '../../../repositories/gender-queries';
import { getOffices } from '../../../repositories/office-queries';
import { getPositions } from '../../../repositories/position-queries';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import EmployeeHistoryModal from '../../modals/employee-history-components/employee-history-modal';
import EmployeeLeaveCreditsModal from '../../modals/employee-leave-credits-modal';
import EmployeePromotion from '../../modals/employee-promotion';
import ManageEmployee from '../../modals/manage-employee';
import ManageEmployeeAttachments from '../../modals/manage-employee-attachments';
import EmployeeButtons from './employee-buttons';
import EmployeeItems from './employee-items';
import EmployeeSearch from './employee-search';

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
  const employeeLeaveCreditsState = useSelector(
    (state: RootState) => state.employeeLeaveCredits
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

  useEffect(
    () => {
      fetchOffices();
      fetchPositions();
      fetchGenders();
    },
    //eslint-disable-next-line
    []
  );

  async function searchEmp() {
    if (!employeeState.initiateSearch) return;
    setBusy(true);
    dispatch(employeeActions.setInitiateSearch(false));
    await searchEmployee(
      employeeState.key,
      employeeState.currentPage,
      undefined,
      employeeState.selectedOfficeId,
      employeeState.selectedPositionId,
      employeeState.selectedGenderId
    )
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

  async function fetchOffices() {
    setBusy(true);
    await getOffices()
      .then((res) => {
        if (res) {
          dispatch(employeeActions.setOffices(res));
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }

  async function fetchPositions() {
    setBusy(true);
    await getPositions()
      .then((res) => {
        if (res) {
          dispatch(employeeActions.setPositions(res));
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }
  async function fetchGenders() {
    setBusy(true);
    await getGenders()
      .then((res) => {
        if (res) {
          dispatch(employeeActions.setGenders(res));
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }

  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.Employees}</div>
      </section>
      <EmployeeSearch />
      <EmployeeButtons />
      <EmployeeItems />
      {employeeModalState.isModalShow && <ManageEmployee />}
      {employeeAttachmentModalState.isModalShow && (
        <ManageEmployeeAttachments />
      )}
      {employeePromotionState.isModalShow && <EmployeePromotion />}
      {employeeHistoryModalState.isModalShow && <EmployeeHistoryModal />}
      {employeeLeaveCreditsState.isModalShow && <EmployeeLeaveCreditsModal />}
    </>
  );
}
