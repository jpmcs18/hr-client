import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import {
  insertEmployee,
  updateEmployee,
} from '../../repositories/employee-queries';
import { getOffices } from '../../repositories/office-queries';
import { employeeModalActions } from '../../state/reducers/employee-modal-reducer';
import { employeeActions } from '../../state/reducers/employee-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManageEmployee() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const employeeModalState = useSelector(
    (state: RootState) => state.employeeModal
  );
  useEffect(
    () => {
      getOff();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(employeeModalActions.setShowModal(false));
    if (hasChange) dispatch(employeeActions.setInitiateSearch(true));
  }
  async function getOff() {
    setBusy(true);
    await getOffices()
      .then((res) => {
        if (res) {
          dispatch(employeeModalActions.setOffices(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (employeeModalState.employee.id > 0) {
      await updateEmployee(employeeModalState.employee)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Employee has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertEmployee(employeeModalState.employee)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New employee has been added.' });
            onModalClose(true);
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
      className='employee-modal'
      onClose={() => onModalClose(false)}
      title='Manage Employee'>
      <div className='modal-content-body'>
        <CustomTextBox
          title='First Name'
          name='firstName'
          value={employeeModalState.employee?.firstName}
          onChange={(ret) => {
            dispatch(employeeModalActions.updateEmployee(ret));
          }}
        />
        <CustomTextBox
          title='Middle Name'
          name='middleName'
          value={employeeModalState.employee?.middleName}
          onChange={(ret) => {
            dispatch(employeeModalActions.updateEmployee(ret));
          }}
        />
        <CustomTextBox
          title='Last Name'
          name='lastName'
          value={employeeModalState.employee?.lastName}
          onChange={(ret) => {
            dispatch(employeeModalActions.updateEmployee(ret));
          }}
        />
        <CustomTextBox
          title='Name Extension (ex Jr., Sr., II)'
          name='extension'
          value={employeeModalState.employee?.extension}
          onChange={(ret) => {
            dispatch(employeeModalActions.updateEmployee(ret));
          }}
        />
        <CustomDropdown
          title='Office'
          hasDefault={true}
          value={employeeModalState.employee.officeId}
          onChange={(ret) => {
            dispatch(employeeModalActions.updateOffice(ret.value));
          }}
          itemsList={employeeModalState.offices.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDropdown
          title='Designation'
          hasDefault={true}
          value={employeeModalState.employee.designationId}
          onChange={(ret) => {
            dispatch(employeeModalActions.updateDesignation(ret.value));
          }}
          itemsList={employeeModalState.designations.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
      </div>
      <div className='modal-footer'>
        <button onClick={saveData} className='btn-modal btn-primary'>
          SAVE
        </button>
      </div>
    </Modal>
  );
}
