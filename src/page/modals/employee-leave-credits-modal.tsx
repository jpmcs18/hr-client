import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { toCommaSeparateAmount } from '../../helper';
import { RootState } from '../../state/store';
import Modal from './modal';

export default function EmployeeLeaveCreditsModal() {
  const employeeLeaveCreditsState = useSelector(
    (state: RootState) => state.employeeLeaveCredits
  );
  function add() {}
  return (
    <Modal
      className='employee-leave-credits-modal'
      title='Manage Employee Leave Credits'>
      <div className='modal-content-body'>
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
