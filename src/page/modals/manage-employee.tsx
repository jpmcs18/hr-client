import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { getBloodTypes } from '../../repositories/blood-type-queries';
import { getCivilStatuses } from '../../repositories/civil-status-queries';
import { getEligibilities } from '../../repositories/eligibility-queries';
import {
  insertEmployee,
  updateEmployee,
} from '../../repositories/employee-queries';
import { getGenders } from '../../repositories/gender-queries';
import { getNatureOfEmployments } from '../../repositories/nature-of-employment-queries';
import { getOffices } from '../../repositories/office-queries';
import { getPositions } from '../../repositories/position-queries';
import { getVaccinationStatuses } from '../../repositories/vaccination-status-queries';
import { employeeModalActions } from '../../state/reducers/employee-modal-reducer';
import { employeeActions } from '../../state/reducers/employee-reducer';
import { RootState } from '../../state/store';
import CustomCheckBoxButton from '../components/custom-checkbox-button';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomDropdown from '../components/custom-dropdown';
import CustomNumber from '../components/custom-number';
import CustomTextArea from '../components/custom-textarea';
import CustomTextBox from '../components/custom-textbox';
import ManageEmployeeEligibilitiesTable from './manage-employee-eligibility-table';
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
      initializeComponent();
    },
    //eslint-disable-next-line
    []
  );

  async function initializeComponent() {
    await getOff();
    await getNOE();
    await getBT();
    await getCS();
    await getGen();
    await getVC();
    await getElg();
    await getPos();
  }

  async function getNOE() {
    setBusy(true);
    await getNatureOfEmployments()
      .then((res) => {
        if (res) {
          dispatch(employeeModalActions.setNatureOfEmployments(res));
        }
      })
      .finally(() => setBusy(false));
  }
  async function getPos() {
    setBusy(true);
    await getPositions()
      .then((res) => {
        if (res) {
          dispatch(employeeModalActions.setAllPositions(res));
        }
      })
      .finally(() => setBusy(false));
  }
  async function getBT() {
    setBusy(true);
    await getBloodTypes()
      .then((res) => {
        if (res) {
          dispatch(employeeModalActions.setBloodTypes(res));
        }
      })
      .finally(() => setBusy(false));
  }
  async function getCS() {
    setBusy(true);
    await getCivilStatuses()
      .then((res) => {
        if (res) {
          dispatch(employeeModalActions.setCivilStatuses(res));
        }
      })
      .finally(() => setBusy(false));
  }
  async function getElg() {
    setBusy(true);
    await getEligibilities()
      .then((res) => {
        if (res) {
          dispatch(employeeModalActions.setEligibilities(res));
        }
      })
      .finally(() => setBusy(false));
  }
  async function getGen() {
    setBusy(true);
    await getGenders()
      .then((res) => {
        if (res) {
          dispatch(employeeModalActions.setGenders(res));
        }
      })
      .finally(() => setBusy(false));
  }
  async function getVC() {
    setBusy(true);
    await getVaccinationStatuses()
      .then((res) => {
        if (res) {
          dispatch(employeeModalActions.setVaccinationStatuses(res));
        }
      })
      .finally(() => setBusy(false));
  }
  async function getOff() {
    setBusy(true);
    await getOffices()
      .then((res) => {
        if (res) {
          dispatch(employeeModalActions.setOffices(res));
        }
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (employeeModalState.employee.id > 0) {
      await updateEmployee(
        employeeModalState.employee,
        employeeModalState.employeeEligibilities.filter((x) => x.added),
        employeeModalState.employeeEligibilities.filter((x) => x.updated),
        employeeModalState.employeeEligibilities
          .filter((x) => x.deleted)
          .map((x) => x.id)
      )
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
      await insertEmployee(
        employeeModalState.employee,
        employeeModalState.employeeEligibilities.filter((x) => x.added)
      )
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
  function onModalClose(hasChange: boolean) {
    dispatch(employeeModalActions.setShowModal(false));
    if (hasChange) dispatch(employeeActions.setInitiateSearch(true));
  }
  return (
    <Modal
      className='employee-modal'
      onClose={() => onModalClose(false)}
      title='Manage Employee'>
      <div className='modal-content-body manage-employee-body'>
        <div className='details-container'>
          <CustomCheckBoxButton
            CheckedTitle='Active'
            UncheckedTitle='Separated'
            id='isActive'
            name='isActive'
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
            isCheck={employeeModalState.employee.isActive ?? false}
          />
          {!employeeModalState.employee.isActive && (
            <>
              <CustomDateTimePicker
                title='Date of Separation'
                type='date'
                className='resigned-fields'
                name='resignationDate'
                value={employeeModalState.employee.resignationDate}
                onChange={(ret) => {
                  dispatch(employeeModalActions.updateEmployee(ret));
                }}
              />
              <CustomDropdown
                title='Mode of Separation'
                hasDefault={true}
                className='resigned-fields'
                name='modeOfResignationId'
                value={employeeModalState.employee.modeOfResignationId}
                onChange={(ret) => {
                  dispatch(employeeModalActions.updateEmployee(ret));
                }}
                itemsList={employeeModalState.modeOfResignations.map((x) => {
                  return {
                    key: x.id.toString(),
                    value: x.description,
                  };
                })}
              />
            </>
          )}
          <CustomTextBox
            title='ID Number'
            name='idNumber'
            placeholder='Leave it blank, to auto generate ID'
            value={employeeModalState.employee?.idNumber}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
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
            title='Nature of Employment'
            name='natureOfEmploymentId'
            hasDefault={true}
            value={employeeModalState.employee.natureOfEmploymentId}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
            itemsList={employeeModalState.natureOfEmployments.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
          {employeeModalState.employee.hasSalaryGrade && (
            <>
              <CustomNumber
                title='Salary Grade'
                type='number'
                name='salaryGrade'
                value={employeeModalState.employee?.salaryGrade?.toString()}
                onChange={(ret) => {
                  dispatch(employeeModalActions.updateEmployee(ret));
                }}
              />
              <CustomNumber
                title='Step'
                type='number'
                name='step'
                value={employeeModalState.employee?.step?.toString()}
                onChange={(ret) => {
                  dispatch(employeeModalActions.updateEmployee(ret));
                }}
              />
            </>
          )}
          <CustomNumber
            title='Salary'
            name='tempSalary'
            type='amount'
            value={employeeModalState.employee?.tempSalary}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
              dispatch(
                employeeModalActions.updateEmployee({
                  elementName: 'salary',
                  value: +ret.value.replaceAll(',', ''),
                })
              );
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
            title='Position'
            hasDefault={true}
            value={employeeModalState.employee.positionId}
            onChange={(ret) => {
              dispatch(employeeModalActions.updatePosition(ret.value));
            }}
            itemsList={(employeeModalState.positions.length > 0
              ? employeeModalState.positions
              : employeeModalState.allPositions
            ).map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
          <CustomTextBox
            title='Contact Number'
            name='contactNumber'
            value={employeeModalState.employee?.contactNumber}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomTextBox
            title='Email Address'
            name='emailAddress'
            value={employeeModalState.employee?.emailAddress}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomDateTimePicker
            title='Date of Employment'
            type='date'
            name='employmentDate'
            value={employeeModalState.employee.employmentDate}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomDateTimePicker
            title='Date of Birth'
            type='date'
            name='birthDate'
            value={employeeModalState.employee.birthDate}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomDropdown
            title='Gender'
            name='genderId'
            hasDefault={true}
            value={employeeModalState.employee.genderId}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
            itemsList={employeeModalState.genders.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
          <CustomDropdown
            title='Civil Status'
            name='civilStatusId'
            hasDefault={true}
            value={employeeModalState.employee.civilStatusId}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
            itemsList={employeeModalState.civilStatuses.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
          <CustomDropdown
            title='Blood Type'
            name='bloodTypeId'
            hasDefault={true}
            value={employeeModalState.employee.bloodTypeId}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
            itemsList={employeeModalState.bloodTypes.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
          <CustomDropdown
            title='Vaccination Status'
            name='vaccinationStatusId'
            hasDefault={true}
            value={employeeModalState.employee.vaccinationStatusId}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
            itemsList={employeeModalState.vaccinationStatuses.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
          <CustomTextBox
            title='Height'
            name='height'
            value={employeeModalState.employee?.height}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomTextBox
            title='Weight'
            name='weight'
            value={employeeModalState.employee?.weight}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomTextArea
            title='Residence Address'
            name='residenceAddress'
            lines={5}
            value={employeeModalState.employee?.residenceAddress}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomTextArea
            title='Skills'
            name='skills'
            lines={5}
            value={employeeModalState.employee?.skills}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomTextBox
            title='GSIS Number'
            name='gsisNo'
            value={employeeModalState.employee?.gsisNo}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomTextBox
            title='PhilHealth Number'
            name='philHealthNo'
            value={employeeModalState.employee?.philHealthNo}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomTextBox
            title='Pag-IBIG Number'
            name='pagIbigNo'
            value={employeeModalState.employee?.pagIbigNo}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomTextBox
            title='SSS Number'
            name='sssNo'
            value={employeeModalState.employee?.sssNo}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
          <CustomTextBox
            title='TIN'
            name='tinNo'
            value={employeeModalState.employee?.tinNo}
            onChange={(ret) => {
              dispatch(employeeModalActions.updateEmployee(ret));
            }}
          />
        </div>
        <div className='manage-container'>
          <CustomDropdown
            title='Eligibilities'
            hasDefault={true}
            onChange={(ret) => {
              dispatch(employeeModalActions.addNewEligibility(ret.value));
            }}
            itemsList={employeeModalState.eligibilities.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
          <ManageEmployeeEligibilitiesTable />
        </div>
      </div>
      <div className='modal-footer'>
        <button onClick={saveData} className='btn-modal btn-primary'>
          SAVE
        </button>
      </div>
    </Modal>
  );
}
