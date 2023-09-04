import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import Employee from '../../../models/entities/Employee';
import Office from '../../../models/entities/Office';
import { searchEmployeeInWorkSchedule } from '../../../repositories/employee-queries';
import { searchOfficeInWorkSchedule } from '../../../repositories/office-queries';
import { workScheduleEmployeeModalActions } from '../../../state/reducers/work-schedule-employee-modal-reducer';
import { RootState } from '../../../state/store';
import SearchBar from '../../components/searchbar';
import ManageEmployeeSchedule from '../manage-employee-schedule';
import Modal from '../modal';
import EmployeeItems from './employee-items';
import OfficeItems from './office-items';
import WorkScheduleEmployeeButtons from './work-schedule-employee-buttons';

export default function ManageWorkScheduleEmployee() {
  const employeeScheduleModalState = useSelector(
    (state: RootState) => state.employeeScheduleModal
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const workScheduleEmployeeModalState = useSelector(
    (state: RootState) => state.workScheduleEmployeeModal
  );
  useEffect(
    () => {
      fetchOffices();
    },
    //eslint-disable-next-line
    [workScheduleEmployeeModalState.initiateSearch]
  );

  useEffect(
    () => {
      fetchEmployee();
    },
    //eslint-disable-next-line
    [workScheduleEmployeeModalState.selectedOffice?.id]
  );

  async function fetchOffices() {
    if (!workScheduleEmployeeModalState.initiateSearch) return;
    dispatch(workScheduleEmployeeModalActions.setInitiateSearch(false));
    setBusy(true);
    await searchOfficeInWorkSchedule(
      workScheduleEmployeeModalState.workSchedule?.id ?? 0,
      workScheduleEmployeeModalState.key
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(workScheduleEmployeeModalActions.setOffices(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }

  async function fetchEmployee() {
    setBusy(true);
    await searchEmployeeInWorkSchedule(
      workScheduleEmployeeModalState.workSchedule?.id ?? 0,
      workScheduleEmployeeModalState.selectedOffice?.id ?? 0
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(workScheduleEmployeeModalActions.setEmployees(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  function onModalClose() {
    dispatch(workScheduleEmployeeModalActions.setShowModal(false));
  }
  function search(key: string) {
    dispatch(workScheduleEmployeeModalActions.setkey(key));
    dispatch(workScheduleEmployeeModalActions.setCurrentPage(1));
    dispatch(workScheduleEmployeeModalActions.setInitiateSearch(true));
  }
  return (
    <Modal
      className='work-schedule-employee-modal'
      onClose={onModalClose}
      title='Manage Employee Schedule'>
      <div className='modal-content-body work-schedule-employee-body'>
        <div>
          <SearchBar
            placeholder='Search Office....'
            search={search}
            value={workScheduleEmployeeModalState.key}
          />
        </div>
        <WorkScheduleEmployeeButtons />
        <div className='employee-container'>
          <OfficeItems
            offices={workScheduleEmployeeModalState.offices}
            selected={workScheduleEmployeeModalState.selectedOffice}
            onSelectedChange={(office: Office) =>
              dispatch(
                workScheduleEmployeeModalActions.setSelectedOffice(office)
              )
            }
            isHeadChecked={workScheduleEmployeeModalState.checkedAllOffice}
            headCheckChange={() =>
              dispatch(workScheduleEmployeeModalActions.setCheckedAllOffice())
            }
            itemCheckChange={(office: Office) => {
              dispatch(
                workScheduleEmployeeModalActions.setCheckedOffice(office)
              );
            }}
          />
          <EmployeeItems
            employees={workScheduleEmployeeModalState.employees}
            selected={workScheduleEmployeeModalState.selectedEmployee}
            onSelectedChange={(employee: Employee) =>
              dispatch(
                workScheduleEmployeeModalActions.setSelectedEmployee(employee)
              )
            }
            isHeadChecked={workScheduleEmployeeModalState.checkedAllEmployee}
            headCheckChange={() =>
              dispatch(workScheduleEmployeeModalActions.setCheckedAllEmployee())
            }
            itemCheckChange={(employee: Employee) => {
              dispatch(
                workScheduleEmployeeModalActions.setCheckedEmployee(employee)
              );
            }}
          />
        </div>
      </div>
      {employeeScheduleModalState.isModalShow && <ManageEmployeeSchedule />}
    </Modal>
  );
}
