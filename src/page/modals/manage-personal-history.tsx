import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { getCivilStatuses } from '../../repositories/civil-status-queries';
import {
  insertPersonalHistory,
  updatePersonalHistory,
} from '../../repositories/personal-history-queries';
import { employeeHistoryModalActions } from '../../state/reducers/employee-history-modal-reducer';
import { personalHistoryModalActions } from '../../state/reducers/personal-history-modal-reducer';
import { RootState } from '../../state/store';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomDropdown from '../components/custom-dropdown';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManagePersonalHistory() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const personalHistoryModalState = useSelector(
    (state: RootState) => state.personalHistoryModal
  );
  useEffect(
    () => {
      fetchCivilStatus();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(personalHistoryModalActions.setShowModal(false));
    if (hasChange)
      dispatch(
        employeeHistoryModalActions.setPersonalHistorySearch({
          elementName: 'initiateSearch',
          value: true,
        })
      );
  }
  async function fetchCivilStatus() {
    setBusy(true);
    await getCivilStatuses()
      .then((res) => {
        if (res) {
          dispatch(personalHistoryModalActions.setCivilStatuses(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (personalHistoryModalState.personalHistory.id > 0) {
      await updatePersonalHistory(personalHistoryModalState.personalHistory)
        .then((res) => {
          if (res) {
            setToasterMessage({
              content: 'Personal history updated.',
            });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertPersonalHistory(personalHistoryModalState.personalHistory)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({
              content: 'New personal history added.',
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
    <Modal
      className='personal-history-modal'
      onClose={() => onModalClose(false)}
      title='Manage Personal History'>
      <div className='modal-content-body'>
        <CustomDateTimePicker
          type='date'
          name='startDate'
          title='Inclusive Date Start'
          value={personalHistoryModalState.personalHistory.startDate}
          onChange={(ret) =>
            dispatch(personalHistoryModalActions.updatePersonalHistory(ret))
          }
        />
        <CustomDateTimePicker
          type='date'
          name='endDate'
          title='Inclusive Date End'
          value={personalHistoryModalState.personalHistory.endDate}
          onChange={(ret) =>
            dispatch(personalHistoryModalActions.updatePersonalHistory(ret))
          }
        />
        <CustomTextBox
          name='fullName'
          title='Full Name'
          value={personalHistoryModalState.personalHistory.fullName}
          onChange={(ret) =>
            dispatch(personalHistoryModalActions.updatePersonalHistory(ret))
          }
        />
        <CustomTextBox
          name='residenceAddress'
          title='Residence Address'
          value={personalHistoryModalState.personalHistory.residenceAddress}
          onChange={(ret) =>
            dispatch(personalHistoryModalActions.updatePersonalHistory(ret))
          }
        />
        <CustomTextBox
          name='contactNumber'
          title='Contact Number'
          value={personalHistoryModalState.personalHistory.contactNumber}
          onChange={(ret) =>
            dispatch(personalHistoryModalActions.updatePersonalHistory(ret))
          }
        />
        <CustomTextBox
          name='emailAddress'
          title='Email Address'
          value={personalHistoryModalState.personalHistory.emailAddress}
          onChange={(ret) =>
            dispatch(personalHistoryModalActions.updatePersonalHistory(ret))
          }
        />
        <CustomDropdown
          title='Civil Status'
          name='civilStatusId'
          value={personalHistoryModalState.personalHistory.civilStatusId}
          itemsList={personalHistoryModalState.civilStatuses.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(personalHistoryModalActions.updatePersonalHistory(ret))
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
