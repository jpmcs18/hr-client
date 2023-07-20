import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { getEmployeeAvailableLeaveCredits } from '../../../repositories/employee-leave-credits-queries';
import { getLeaveRequestTypes } from '../../../repositories/leave-request-type-queries';
import { leaveApplicationActions } from '../../../state/reducers/leave-application-reducer';
import { RootState } from '../../../state/store';
import CustomSteps from '../../components/custom-steps';
import Modal from '../modal';
import FirstStep from './first-step';
import SecondStep from './second-step';
import ThirdStep from './third-step';

export default function LeaveApplicationModal() {
  const dispatch = useDispatch();
  const leaveApplicationState = useSelector(
    (state: RootState) => state.leaveApplication
  );
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      fetchLeaveRequestTypes();
    },
    //eslint-disable-next-line
    []
  );
  useEffect(
    () => {
      getAvailableLeaveCredits();
    },
    //eslint-disable-next-line
    [
      leaveApplicationState.leaveRequest.employeeId,
      leaveApplicationState.leaveRequest.leaveRequestTypeId,
    ]
  );
  async function getAvailableLeaveCredits() {
    if (
      !leaveApplicationState.leaveRequest.employeeId ||
      !leaveApplicationState.leaveRequest.leaveRequestTypeId
    ) {
      dispatch(leaveApplicationActions.setAvailableLeaveCredits(undefined));
      return;
    }
    setBusy(true);
    await getEmployeeAvailableLeaveCredits(
      leaveApplicationState.leaveRequest.employeeId ?? 0,
      leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0
    )
      .then((res) => {
        dispatch(leaveApplicationActions.setAvailableLeaveCredits(res));
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }

  function onClose() {
    dispatch(leaveApplicationActions.setShowModal(false));
  }
  async function fetchLeaveRequestTypes() {
    setBusy(true);
    await getLeaveRequestTypes()
      .then((res) => {
        if (res) {
          dispatch(leaveApplicationActions.setLeaveRequestTypes(res));
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }
  return (
    <Modal
      title='Leave Application'
      className='leave-application-modal'
      onClose={onClose}>
      <CustomSteps
        steps={leaveApplicationState.steps}
        currentStep={leaveApplicationState.currentStep}
      />
      {leaveApplicationState.currentStep === 1 && <FirstStep />}
      {leaveApplicationState.currentStep === 2 && <SecondStep />}
      {leaveApplicationState.currentStep === 3 && <ThirdStep />}
    </Modal>
  );
}
