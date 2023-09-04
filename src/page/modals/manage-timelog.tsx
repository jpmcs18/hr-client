import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { getAreas } from '../../repositories/area-queries';
import {
  insertTimeLog,
  updateTimeLog,
} from '../../repositories/timelog-queries';
import { timelogModalActions } from '../../state/reducers/timelog-modal-reducer';
import { timelogActions } from '../../state/reducers/timelog-reducer';
import { RootState } from '../../state/store';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomDropdown from '../components/custom-dropdown';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManageTimeLog() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const timelogModalState = useSelector(
    (state: RootState) => state.timelogModal
  );

  useEffect(
    () => {
      fetchArea();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(timelogModalActions.setShowModal(false));
    if (hasChange) dispatch(timelogActions.setInitiateSearch(true));
  }

  async function fetchArea() {
    setBusy(true);
    await getAreas()
      .then((res) => {
        if (res) {
          dispatch(timelogModalActions.setAreas(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }

  async function saveData() {
    setBusy(true);
    if (timelogModalState.timelog.id > 0) {
      await updateTimeLog(timelogModalState.timelog)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Time log has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertTimeLog(timelogModalState.timelog)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New time log has been added.' });
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
      className='timelog-modal'
      onClose={() => onModalClose(false)}
      title='Manage TimeLog'>
      <div className='modal-content-body'>
        <div>
          <CustomDateTimePicker
            title='Login'
            type='datetime-local'
            name='loginDate'
            value={timelogModalState.timelog.loginDate}
            onChange={(ret) => dispatch(timelogModalActions.updateTimeLog(ret))}
          />
          <CustomDropdown
            title='Area'
            name='areaInId'
            value={timelogModalState.timelog.areaInId}
            onChange={(ret) => dispatch(timelogModalActions.updateTimeLog(ret))}
            itemsList={timelogModalState.areas.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
        </div>
        <div>
          <CustomDateTimePicker
            title='Logout'
            type='datetime-local'
            name='logoutDate'
            value={timelogModalState.timelog.logoutDate}
            onChange={(ret) => dispatch(timelogModalActions.updateTimeLog(ret))}
          />
          <CustomDropdown
            title='Area'
            name='areaOutId'
            value={timelogModalState.timelog.areaOutId}
            onChange={(ret) => dispatch(timelogModalActions.updateTimeLog(ret))}
            itemsList={timelogModalState.areas.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
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
