import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import {
  insertEmployeeHistory,
  updateEmployeeHistory,
} from '../../repositories/employee-history-queries';
import { getNatureOfEmployments } from '../../repositories/nature-of-employment-queries';
import { getOffices } from '../../repositories/office-queries';
import { getPositions } from '../../repositories/position-queries';
import { employeeHistoryModalActions } from '../../state/reducers/employee-history-modal-reducer';
import { serviceRecordModalActions } from '../../state/reducers/service-record-modal-reducer';
import { RootState } from '../../state/store';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomDropdown from '../components/custom-dropdown';
import CustomNumber from '../components/custom-number';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManageServiceRecord() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const serviceRecordModalState = useSelector(
    (state: RootState) => state.serviceRecordModal
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
    dispatch(serviceRecordModalActions.setShowModal(false));
    if (hasChange)
      dispatch(
        employeeHistoryModalActions.setEmployeeHistorySearch({
          elementName: 'initiateSearch',
          value: true,
        })
      );
  }
  async function fetchOffices() {
    setBusy(true);
    await getOffices()
      .then((res) => {
        if (res) {
          dispatch(serviceRecordModalActions.setOffices(res));
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
          dispatch(serviceRecordModalActions.setPositions(res));
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
          dispatch(serviceRecordModalActions.setNatureOfEmployments(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (serviceRecordModalState.employeeHistory.id > 0) {
      await updateEmployeeHistory(serviceRecordModalState.employeeHistory)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Service record has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertEmployeeHistory(serviceRecordModalState.employeeHistory)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({
              content: 'New service record has been added.',
            });
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
    <Modal onClose={() => onModalClose(false)} title='Manage Service Record'>
      <div className='modal-content-body'>
        <CustomDateTimePicker
          type='date'
          name='startDate'
          title='Inclusive Date Start'
          value={serviceRecordModalState.employeeHistory.startDate}
          onChange={(ret) =>
            dispatch(serviceRecordModalActions.updateEmployeeHistory(ret))
          }
        />
        <CustomDateTimePicker
          type='date'
          name='endDate'
          title='Inclusive Date End'
          value={serviceRecordModalState.employeeHistory.endDate}
          onChange={(ret) =>
            dispatch(serviceRecordModalActions.updateEmployeeHistory(ret))
          }
        />
        <CustomDropdown
          title='Employment Type'
          name='natureOfEmploymentId'
          value={serviceRecordModalState.employeeHistory.natureOfEmploymentId}
          itemsList={serviceRecordModalState.natureOfEmployments.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(serviceRecordModalActions.updateEmployeeHistory(ret))
          }
        />
        <CustomDropdown
          title='Office'
          name='officeId'
          value={serviceRecordModalState.employeeHistory.officeId}
          itemsList={serviceRecordModalState.offices.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(serviceRecordModalActions.updateEmployeeHistory(ret))
          }
        />
        <CustomDropdown
          title='Position'
          name='positionId'
          value={serviceRecordModalState.employeeHistory.positionId}
          itemsList={serviceRecordModalState.positions.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(serviceRecordModalActions.updateEmployeeHistory(ret))
          }
        />
        <CustomDropdown
          title='Detailed Office (for regular/permanent employees)'
          name='detailedOfficeId'
          value={serviceRecordModalState.employeeHistory.detailedOfficeId}
          itemsList={serviceRecordModalState.offices.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(serviceRecordModalActions.updateEmployeeHistory(ret))
          }
        />
        <CustomDropdown
          title='Detailed Position (for regular/permanent employees)'
          name='detailedPositionId'
          value={serviceRecordModalState.employeeHistory.detailedPositionId}
          itemsList={serviceRecordModalState.detailedPositions.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(serviceRecordModalActions.updateEmployeeHistory(ret))
          }
        />
        <CustomNumber
          title='Salary Per Annum'
          type='amount'
          name='salary'
          value={serviceRecordModalState.employeeHistory.salary}
          onValueChange={(ret) =>
            dispatch(serviceRecordModalActions.updateEmployeeHistory(ret))
          }
        />
        <CustomTextBox
          title='NO LAWOP'
          name='nolawop'
          value={serviceRecordModalState.employeeHistory.nolawop}
          onChange={(ret) =>
            dispatch(serviceRecordModalActions.updateEmployeeHistory(ret))
          }
        />
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
