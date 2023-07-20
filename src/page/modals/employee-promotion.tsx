import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { promoteEmployee } from '../../repositories/employee-queries';
import { getNatureOfEmployments } from '../../repositories/nature-of-employment-queries';
import { getOffices } from '../../repositories/office-queries';
import { getPositions } from '../../repositories/position-queries';
import { getSalaryGradeItem } from '../../repositories/salary-grade-item-queries';
import { employeePromotionActions } from '../../state/reducers/employee-promotion-reducer';
import { employeeActions } from '../../state/reducers/employee-reducer';
import { RootState } from '../../state/store';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomDropdown from '../components/custom-dropdown';
import CustomNumber from '../components/custom-number';
import Modal from './modal';

export default function EmployeePromotion() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const employeePromotionState = useSelector(
    (state: RootState) => state.employeePromotion
  );
  useEffect(
    () => {
      fetchOffices();
      fetchPositions();
      fetchNatureofEmployments();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(employeePromotionActions.setShowModal(false));
    if (hasChange) dispatch(employeeActions.setInitiateSearch(true));
  }
  async function fetchOffices() {
    setBusy(true);
    await getOffices()
      .then((res) => {
        if (res) {
          dispatch(employeePromotionActions.setOffices(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function fetchPositions() {
    setBusy(true);
    await getPositions()
      .then((res) => {
        if (res) {
          dispatch(employeePromotionActions.setPositions(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function fetchNatureofEmployments() {
    setBusy(true);
    await getNatureOfEmployments()
      .then((res) => {
        if (res) {
          dispatch(employeePromotionActions.setNatureOfEmployments(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  function validate(): boolean {
    let message = '';
    if (!employeePromotionState.employeePromotion.natureOfEmploymentId) {
      message += 'Please fill Employment Type\n';
    }
    if (!employeePromotionState.employeePromotion.officeId) {
      message += 'Please fill Office\n';
    }
    if (!employeePromotionState.employeePromotion.positionId) {
      message += 'Please fill Position\n';
    }

    return !!message;
  }
  async function saveData() {
    setBusy(true);
    if (!validate()) {
      return;
    }
    await promoteEmployee(
      employeePromotionState.employeePromotion.employeeId,
      employeePromotionState.employeePromotion.natureOfEmploymentId!,
      employeePromotionState.employeePromotion.appointmentDate,
      employeePromotionState.employeePromotion.officeId!,
      employeePromotionState.employeePromotion.positionId!,
      employeePromotionState.employeePromotion.detailedOfficeId,
      employeePromotionState.employeePromotion.detailedPositionId,
      employeePromotionState.employeePromotion.salaryGrade,
      employeePromotionState.employeePromotion.step,
      employeePromotionState.employeePromotion.salary
    )
      .then((res) => {
        if (res !== undefined) {
          setToasterMessage({
            content: 'Employee promoted.',
          });
          onModalClose(true);
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function fetchSalaryGrade() {
    setBusy(true);
    await getSalaryGradeItem(
      employeePromotionState.employeePromotion.salaryGrade ?? 0,
      employeePromotionState.employeePromotion.step ?? 0
    )
      .then((res) => {
        if (res) {
          dispatch(
            employeePromotionActions.updateEmployeePromotion({
              elementName: 'salary',
              value: res.amount,
            })
          );
        }
      })
      .finally(() => {
        setBusy(false);
      });
  }
  async function getSalaryGradeAmount() {
    if (
      (employeePromotionState.employeePromotion.salaryGrade ?? 0) > 0 &&
      (employeePromotionState.employeePromotion.step ?? 0) > 0
    ) {
      await fetchSalaryGrade();
    }
  }
  return (
    <Modal
      className='service-record-modal'
      onClose={() => onModalClose(false)}
      title='Employee Promotion'>
      <div className='modal-content-body service-record-content-body'>
        <div className='details'>
          <CustomDateTimePicker
            type='date'
            name='appointmentDate'
            title='Appintment Date'
            value={employeePromotionState.employeePromotion.appointmentDate}
            onChange={(ret) =>
              dispatch(employeePromotionActions.updateEmployeePromotion(ret))
            }
          />
          <CustomDropdown
            title='Employment Type'
            name='natureOfEmploymentId'
            value={
              employeePromotionState.employeePromotion.natureOfEmploymentId
            }
            itemsList={employeePromotionState.natureOfEmployments.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
            onChange={(ret) =>
              dispatch(employeePromotionActions.updateEmployeePromotion(ret))
            }
          />
          <CustomDropdown
            title='Office'
            name='officeId'
            value={employeePromotionState.employeePromotion.officeId}
            itemsList={employeePromotionState.offices.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
            onChange={(ret) =>
              dispatch(employeePromotionActions.updateEmployeePromotion(ret))
            }
          />
          <CustomDropdown
            title='Position'
            name='positionId'
            value={employeePromotionState.employeePromotion.positionId}
            itemsList={employeePromotionState.positions.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
            onChange={(ret) =>
              dispatch(employeePromotionActions.updateEmployeePromotion(ret))
            }
          />
          <CustomDropdown
            title='Detailed Office'
            name='detailedOfficeId'
            value={employeePromotionState.employeePromotion.detailedOfficeId}
            itemsList={employeePromotionState.offices.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
            onChange={(ret) =>
              dispatch(employeePromotionActions.updateEmployeePromotion(ret))
            }
          />
          <CustomDropdown
            title='Detailed Position'
            name='detailedPositionId'
            value={employeePromotionState.employeePromotion.detailedPositionId}
            itemsList={employeePromotionState.detailedPositions.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
            onChange={(ret) =>
              dispatch(employeePromotionActions.updateEmployeePromotion(ret))
            }
          />
          {employeePromotionState.isRegular && (
            <>
              <CustomNumber
                title='Salary Grade'
                type='number'
                name='salaryGrade'
                value={employeePromotionState.employeePromotion?.salaryGrade}
                onChange={(ret) => {
                  dispatch(
                    employeePromotionActions.updateEmployeePromotion(ret)
                  );
                }}
                onInputBlur={getSalaryGradeAmount}
              />
              <CustomNumber
                title='Step'
                type='number'
                name='step'
                value={employeePromotionState.employeePromotion?.step}
                onChange={(ret) => {
                  dispatch(
                    employeePromotionActions.updateEmployeePromotion(ret)
                  );
                }}
                onInputBlur={getSalaryGradeAmount}
              />
            </>
          )}
          <CustomNumber
            title='Salary'
            type='amount'
            name='salary'
            value={employeePromotionState.employeePromotion.salary}
            onChange={(ret) =>
              dispatch(employeePromotionActions.updateEmployeePromotion(ret))
            }
          />
        </div>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
