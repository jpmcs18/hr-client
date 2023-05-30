import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { toCommaSeparateAmount } from '../../helper';
import { getEmployeeLeaveCredits } from '../../repositories/employee-leave-credits-queries';
import { employeeLeaveCreditsActions } from '../../state/reducers/employee-leave-credits-reducer';
import { RootState } from '../../state/store';
import Modal from './modal';

export default function EmployeeLeaveCreditsModal() {
  const employeeLeaveCreditsState = useSelector(
    (state: RootState) => state.employeeLeaveCredits
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();

  useEffect(
    () => {
      fetchEmployeeLeaveCredits();
    },
    //eslint-disable-next-line
    [employeeLeaveCreditsState.employee]
  );

  function add() {}

  async function fetchEmployeeLeaveCredits() {
    setBusy(true);
    await getEmployeeLeaveCredits(employeeLeaveCreditsState.employee?.id!)
      .then((res) => {
        if (res) {
          dispatch(employeeLeaveCreditsActions.setEmployeeLeaveCredits(res));
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  return (
    <Modal
      className='employee-leave-credits-modal'
      title='Manage Employee Leave Credits'>
      <div className='modal-content-body employee-leave-credits-body'>
        <div className='table-container'>
          <div>
            <div className='btn-actions-group'>
              <button className='btn-action' onClick={add}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          <table className='item-table'>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Remaining Credits</th>
              </tr>
            </thead>
            <tbody>
              {employeeLeaveCreditsState.employeeLeaveCredits.map((leave) => (
                <tr>
                  <td>{leave.leaveType?.description}</td>
                  <td>{toCommaSeparateAmount(leave.credits.toString())}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
