import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import {
  insertEmployeeLeaveCredits,
  updateEmployeeLeaveCredits,
} from '../../repositories/employee-leave-credits-queries';
import { getLeaveTypes } from '../../repositories/leave-type-queries';
import { employeeLeaveCreditsModalActions } from '../../state/reducers/employee-leave-credits-modal-reducer';
import { employeeLeaveCreditsActions } from '../../state/reducers/employee-leave-credits-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';
import CustomNumber from '../components/custom-number';
import Modal from './modal';

export default function ManageEmployeeLeaveCredits() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const employeeLeaveCreditsModalState = useSelector(
    (state: RootState) => state.employeeLeaveCreditsModal
  );

  useEffect(
    () => {
      fetchLeaveTypes();
    },
    //eslint-disable-next-line
    []
  );

  async function fetchLeaveTypes() {
    setBusy(true);
    await getLeaveTypes()
      .then((res) => {
        if (res) {
          dispatch(employeeLeaveCreditsModalActions.setLeaveTypes(res));
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }

  function onModalClose(hasChange: boolean) {
    dispatch(employeeLeaveCreditsModalActions.setShowModal(false));
    if (hasChange)
      dispatch(employeeLeaveCreditsActions.setInitiateSearch(true));
  }

  async function saveData() {
    setBusy(true);
    if (employeeLeaveCreditsModalState.employeeLeaveCredits.id > 0) {
      await updateEmployeeLeaveCredits(
        employeeLeaveCreditsModalState.employeeLeaveCredits
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Leave credit has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertEmployeeLeaveCredits(
        employeeLeaveCreditsModalState.employeeLeaveCredits
      )
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New leave credit has been added.' });
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
      className='manage-employee-leave-credits-modal'
      onClose={() => onModalClose(false)}
      title='Manage Employee Leave Credits'>
      <div className='modal-content-body manage-employee-leave-credits-body'>
        <CustomDropdown
          title='Leave Type'
          name='leaveTypeId'
          value={
            employeeLeaveCreditsModalState.employeeLeaveCredits.leaveTypeId
          }
          itemsList={employeeLeaveCreditsModalState.leaveTypes.map(
            (leaveType) => {
              return {
                key: leaveType.id.toString(),
                value: leaveType.description,
              };
            }
          )}
          onChange={(ret) =>
            dispatch(
              employeeLeaveCreditsModalActions.updateEmployeeLeaveCredits(ret)
            )
          }
        />
        <CustomNumber
          type='number'
          name='credits'
          value={employeeLeaveCreditsModalState.employeeLeaveCredits.credits}
          onValueChange={(ret) =>
            dispatch(
              employeeLeaveCreditsModalActions.updateEmployeeLeaveCredits(ret)
            )
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
