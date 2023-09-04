import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import Employee from '../../models/entities/Employee';
import Office from '../../models/entities/Office';
import { searchEmployeeNotInWorkSchedule } from '../../repositories/employee-queries';
import {
  addEmployeeScheduleAll,
  addEmployeeScheduleByCheckedEmployeesOfSelectedOffice,
  addEmployeeScheduleByCheckedOffices,
  addEmployeeScheduleBySelectedEmployee,
  addEmployeeScheduleBySelectedOffice,
} from '../../repositories/employee-schedule-queries';
import { searchNotInWorkSchedule } from '../../repositories/office-queries';
import { employeeScheduleModalActions } from '../../state/reducers/employee-schedule-modal-reducer';
import { workScheduleEmployeeModalActions } from '../../state/reducers/work-schedule-employee-modal-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';
import SearchBar from '../components/searchbar';
import Modal from './modal';
import EmployeeItems from './work-schedule-employee-components/employee-items';
import OfficeItems from './work-schedule-employee-components/office-items';

export default function ManageEmployeeSchedule() {
  const employeeScheduleModalState = useSelector(
    (state: RootState) => state.employeeScheduleModal
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      fetchOffice();
    },
    //eslint-disable-next-line
    [employeeScheduleModalState.initiateSearch]
  );

  useEffect(
    () => {
      fetchEmployee();
    },
    //eslint-disable-next-line
    [employeeScheduleModalState.selectedOffice?.id]
  );

  async function fetchOffice() {
    if (!employeeScheduleModalState.initiateSearch) return true;
    setBusy(true);
    dispatch(employeeScheduleModalActions.setInitiateSearch(false));
    await searchNotInWorkSchedule(employeeScheduleModalState.key)
      .then((res) => {
        if (res) {
          dispatch(employeeScheduleModalActions.setOffices(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }

  async function fetchEmployee() {
    setBusy(true);
    await searchEmployeeNotInWorkSchedule(
      employeeScheduleModalState.workScheduleId ?? 0,
      employeeScheduleModalState.selectedOffice?.id ?? 0
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(employeeScheduleModalActions.setEmployees(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }

  async function search(key: string) {
    dispatch(employeeScheduleModalActions.setkey(key));
    dispatch(employeeScheduleModalActions.setCurrentPage(1));
    dispatch(employeeScheduleModalActions.setInitiateSearch(true));
  }
  function onClose(hasReturn: boolean) {
    dispatch(employeeScheduleModalActions.setShowModal(false));
    if (hasReturn) {
      dispatch(workScheduleEmployeeModalActions.setInitiateSearch(true));
    }
  }
  async function saveData() {
    if (employeeScheduleModalState.selectedOption === '1') {
      if (!employeeScheduleModalState.selectedOffice?.id) {
        setToasterMessage({ content: 'Select an office first.' });
        return;
      }
      setBusy(true);
      await addEmployeeScheduleBySelectedOffice(
        employeeScheduleModalState.workScheduleId ?? 0,
        employeeScheduleModalState.selectedOffice?.id ?? 0
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Add Successful.' });
            onClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
    if (employeeScheduleModalState.selectedOption === '2') {
      if (!employeeScheduleModalState.selectedEmployee?.id) {
        setToasterMessage({ content: 'Select an employee first.' });
        return;
      }
      setBusy(true);
      await addEmployeeScheduleBySelectedEmployee(
        employeeScheduleModalState.workScheduleId ?? 0,
        employeeScheduleModalState.selectedEmployee?.id ?? 0
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Add Successful.' });
            onClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
    if (employeeScheduleModalState.selectedOption === '3') {
      if (
        !employeeScheduleModalState.offices.filter((x) => x.isChecked).length
      ) {
        setToasterMessage({ content: 'Check an office first.' });
        return;
      }
      setBusy(true);
      await addEmployeeScheduleByCheckedOffices(
        employeeScheduleModalState.workScheduleId ?? 0,
        employeeScheduleModalState.offices
          .filter((x) => x.isChecked)
          .map((x) => x.id)
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Add Successful.' });
            onClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
    if (employeeScheduleModalState.selectedOption === '4') {
      if (
        !employeeScheduleModalState.employees.filter((x) => x.isChecked).length
      ) {
        setToasterMessage({ content: 'Check an employee first.' });
        return;
      }
      setBusy(true);
      await addEmployeeScheduleByCheckedEmployeesOfSelectedOffice(
        employeeScheduleModalState.workScheduleId ?? 0,
        employeeScheduleModalState.employees
          .filter((x) => x.isChecked)
          .map((x) => x.id)
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Add Successful.' });
            onClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
    if (employeeScheduleModalState.selectedOption === '5') {
      setBusy(true);
      await addEmployeeScheduleAll(
        employeeScheduleModalState.workScheduleId ?? 0
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Add Successful.' });
            onClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  return (
    <Modal
      className='add-employee-modal'
      onClose={() => onClose(false)}
      title={'Add Employee'}>
      <div className='modal-content-body add-employee-body'>
        <div>
          <SearchBar
            search={search}
            placeholder='Search Key'
            value={employeeScheduleModalState.key}
          />
        </div>
        <div className='employee-container'>
          <OfficeItems
            offices={employeeScheduleModalState.offices}
            selected={employeeScheduleModalState.selectedOffice}
            onSelectedChange={(office: Office) =>
              dispatch(employeeScheduleModalActions.setSelectedOffice(office))
            }
            isHeadChecked={employeeScheduleModalState.checkedAllOffice}
            headCheckChange={() =>
              dispatch(employeeScheduleModalActions.setCheckedAllOffice())
            }
            itemCheckChange={(office: Office) => {
              dispatch(employeeScheduleModalActions.setCheckedOffice(office));
            }}
          />
          <EmployeeItems
            employees={employeeScheduleModalState.employees}
            selected={employeeScheduleModalState.selectedEmployee}
            onSelectedChange={(employee: Employee) =>
              dispatch(
                employeeScheduleModalActions.setSelectedEmployee(employee)
              )
            }
            isHeadChecked={employeeScheduleModalState.checkedAllEmployee}
            headCheckChange={() =>
              dispatch(employeeScheduleModalActions.setCheckedAllEmployee())
            }
            itemCheckChange={(employee: Employee) => {
              dispatch(
                employeeScheduleModalActions.setCheckedEmployee(employee)
              );
            }}
          />
        </div>
      </div>
      <div className='modal-footer'>
        <div className='modal-footer-container'>
          <CustomDropdown
            title='Add Option'
            value={employeeScheduleModalState.selectedOption}
            onChange={(ret) =>
              dispatch(
                employeeScheduleModalActions.setSelectedOption(ret.value)
              )
            }
            itemsList={[
              {
                key: '1',
                value: 'Selected Office',
              },
              {
                key: '2',
                value: 'Selected Employee',
              },
              {
                key: '3',
                value: 'Checked Offices',
              },
              {
                key: '4',
                value: 'Checked Employees of Selected Office',
              },
              {
                key: '5',
                value: 'All',
              },
            ]}
          />
          <div className='btn-actions-group'>
            <button onClick={saveData} className='btn-action'>
              <FontAwesomeIcon icon={faUserCheck} />
              <span className='desktop-features'>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
