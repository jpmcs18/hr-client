import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { getSchedules } from '../../repositories/schedule-queries';
import {
  insertWorkSchedule,
  updateWorkSchedule,
} from '../../repositories/work-schedule-queries';
import { workScheduleModalActions } from '../../state/reducers/work-schedule-modal-reducer';
import { workScheduleActions } from '../../state/reducers/work-schedule-reducer';
import { RootState } from '../../state/store';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomDropdown from '../components/custom-dropdown';
import Modal from './modal';

export default function ManageWorkSchedule() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const workScheduleModalState = useSelector(
    (state: RootState) => state.workScheduleModal
  );

  useEffect(
    () => {
      fetchSchedules();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(workScheduleModalActions.setShowModal(false));
    if (hasChange) dispatch(workScheduleActions.setInitiateSearch(true));
  }

  async function fetchSchedules() {
    setBusy(true);
    await getSchedules()
      .then((res) => {
        if (res) {
          dispatch(workScheduleModalActions.setSchedules(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }

  async function saveData() {
    setBusy(true);
    if (workScheduleModalState.workSchedule.id > 0) {
      await updateWorkSchedule(workScheduleModalState.workSchedule)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Schedule has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertWorkSchedule(workScheduleModalState.workSchedule)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New schedule has been added.' });
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
      className='work-schedule-modal'
      onClose={() => onModalClose(false)}
      title='Manage Schedule'>
      <div className='modal-content-body'>
        <CustomDateTimePicker
          type='date'
          title='Effectivity Date'
          name='effectivityDate'
          value={workScheduleModalState.workSchedule.effectivityDate}
          onChange={(ret) =>
            dispatch(workScheduleModalActions.updateWorkSchedule(ret))
          }
        />
        <CustomDateTimePicker
          type='date'
          title='Expiry Date'
          name='expiryDate'
          value={workScheduleModalState.workSchedule.expiryDate}
          onChange={(ret) =>
            dispatch(workScheduleModalActions.updateWorkSchedule(ret))
          }
        />
        <CustomDropdown
          title='Sunday'
          name='sundayScheduleId'
          value={workScheduleModalState.workSchedule.sundayScheduleId}
          itemsList={workScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(workScheduleModalActions.updateWorkSchedule(ret))
          }
        />
        <CustomDropdown
          title='Monday'
          name='mondayScheduleId'
          value={workScheduleModalState.workSchedule.mondayScheduleId}
          itemsList={workScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(workScheduleModalActions.updateWorkSchedule(ret))
          }
        />
        <CustomDropdown
          title='Tuesday'
          name='tuesdayScheduleId'
          value={workScheduleModalState.workSchedule.tuesdayScheduleId}
          itemsList={workScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(workScheduleModalActions.updateWorkSchedule(ret))
          }
        />
        <CustomDropdown
          title='Wednesday'
          name='wednesdayScheduleId'
          value={workScheduleModalState.workSchedule.wednesdayScheduleId}
          itemsList={workScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(workScheduleModalActions.updateWorkSchedule(ret))
          }
        />
        <CustomDropdown
          title='Thursday'
          name='thursdayScheduleId'
          value={workScheduleModalState.workSchedule.thursdayScheduleId}
          itemsList={workScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(workScheduleModalActions.updateWorkSchedule(ret))
          }
        />
        <CustomDropdown
          title='Friday'
          name='fridayScheduleId'
          value={workScheduleModalState.workSchedule.fridayScheduleId}
          itemsList={workScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(workScheduleModalActions.updateWorkSchedule(ret))
          }
        />
        <CustomDropdown
          title='Saturday'
          name='saturdayScheduleId'
          value={workScheduleModalState.workSchedule.saturdayScheduleId}
          itemsList={workScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
          onChange={(ret) =>
            dispatch(workScheduleModalActions.updateWorkSchedule(ret))
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
