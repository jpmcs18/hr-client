import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import Employee from '../../models/entities/Employee';
import {
  insertLeaveRequestApprover,
  updateLeaveRequestApprover,
} from '../../repositories/leave-request-approver-queries';
import { getLeaveRequestApproverTypes } from '../../repositories/leave-request-approver-type-queries';
import { employeeSearchableActions } from '../../state/reducers/employee-searchable-reducer';
import { leaveRequestApproverModalActions } from '../../state/reducers/leave-request-approver-modal-reducer';
import { leaveRequestApproverActions } from '../../state/reducers/leave-request-approver-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';
import CustomSelector from '../components/custom-selector';
import Modal from './modal';
import EmployeeSearchable from './searchables/employee-searchable';

export default function ManageLeaveRequestApprover() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const leaveRequestApproverModalState = useSelector(
    (state: RootState) => state.leaveRequestApproverModal
  );
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );
  useEffect(
    () => {
      fetchLeaveRequestApproverTypes();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(leaveRequestApproverModalActions.setShowModal(false));
    if (hasChange)
      dispatch(leaveRequestApproverActions.setInitiateSearch(true));
  }
  async function fetchLeaveRequestApproverTypes() {
    setBusy(true);
    await getLeaveRequestApproverTypes()
      .then((res) => {
        if (res) {
          dispatch(
            leaveRequestApproverModalActions.setLeaveRequestApproverTypes(res)
          );
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (leaveRequestApproverModalState.leaveRequestApprover.id > 0) {
      await updateLeaveRequestApprover(
        leaveRequestApproverModalState.leaveRequestApprover
      )
        .then((res) => {
          if (res) {
            setToasterMessage({
              content: 'Approver updated.',
            });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertLeaveRequestApprover(
        leaveRequestApproverModalState.leaveRequestApprover
      )
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({
              content: 'New approver added.',
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
  function onCloseEmployeeSearch(employee?: Employee) {
    if (employee) {
      console.log(employee);
      dispatch(
        leaveRequestApproverModalActions.updateLeaveRequestApprover({
          elementName: 'approver',
          value: employee,
        })
      );
      dispatch(
        leaveRequestApproverModalActions.updateLeaveRequestApprover({
          elementName: 'approverId',
          value: employee.id,
        })
      );
    }
  }
  return (
    <Modal
      className='leaveRequestApprover-modal'
      onClose={() => onModalClose(false)}
      title='Manage Leave Request Approver'>
      <div className='modal-content-body'>
        <CustomDropdown
          title='Approver Type'
          name='leaveRequestApproverTypeId'
          value={
            leaveRequestApproverModalState.leaveRequestApprover
              .leaveRequestApproverTypeId
          }
          itemsList={leaveRequestApproverModalState.leaveRequestApproverTypes.map(
            (x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            }
          )}
          onChange={(ret) => {
            dispatch(
              leaveRequestApproverModalActions.updateLeaveRequestApprover(ret)
            );
          }}
        />
        <CustomSelector
          title='Approver'
          value={
            leaveRequestApproverModalState.leaveRequestApprover?.approver
              ?.fullName
          }
          onSelectorClick={() => {
            dispatch(
              employeeSearchableActions.setOnCloseFunction(
                onCloseEmployeeSearch
              )
            );
            dispatch(employeeSearchableActions.setShowModal(true));
          }}
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

      <>{employeeSearchableState.isModalShow && <EmployeeSearchable />}</>
    </Modal>
  );
}
