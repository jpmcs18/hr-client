import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { disapproveLeaveRequest } from '../../repositories/leave-request-queries';
import { leaveRequestDisapprovalActions } from '../../state/reducers/leave-request-disapproval-reducer';
import { leaveRequestActions } from '../../state/reducers/leave-request-reducer';
import { RootState } from '../../state/store';
import CustomTextArea from '../components/custom-textarea';
import Modal from './modal';

export default function ManageLeaveRequestDisapproval() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const leaveRequestDisapprovalState = useSelector(
    (state: RootState) => state.leaveRequestDisapproval
  );
  function onModalClose(hasChange: boolean) {
    dispatch(leaveRequestDisapprovalActions.setShowModal(false));
    if (hasChange) {
      dispatch(leaveRequestActions.setInitiateSearch(true));
      leaveRequestDisapprovalState.onCloseFunction?.();
    }
  }

  async function disapprove() {
    setBusy(true);
    if (!leaveRequestDisapprovalState.remarks) {
      setToasterMessage({ content: 'Reason is required.' });
      return;
    }
    await disapproveLeaveRequest(
      leaveRequestDisapprovalState.leaveRequest?.id ?? 0,
      leaveRequestDisapprovalState.isFinal,
      leaveRequestDisapprovalState.remarks
    )
      .then((res) => {
        if (res) {
          setToasterMessage({
            content: `Leave application ${
              leaveRequestDisapprovalState.isFinal ? 'disapproved' : 'cancelled'
            }.`,
          });
          onModalClose(true);
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  return (
    <Modal
      className='leave-request-disapproval-modal'
      onClose={() => onModalClose(false)}
      title=''>
      <div className='modal-content-body'>
        <CustomTextArea
          title='Reason'
          value={leaveRequestDisapprovalState.remarks}
          onChange={(ret) =>
            dispatch(leaveRequestDisapprovalActions.updateRemarks(ret.value))
          }
        />
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={disapprove} className='btn-action'>
            <FontAwesomeIcon icon={faCheck} />
            <span className='desktop-features'>Proceed</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
