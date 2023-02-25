import { useDispatch } from 'react-redux';
import {
  useMessage,
  useSetCloseMessageDialog,
} from '../../custom-hooks/authorize-provider';
import { userProfileAction } from '../../state/reducers/user-profile-reducer';
import Modal from './modal';

export default function MessageDialog() {
  const closeDialog = useSetCloseMessageDialog();
  const Message = useMessage();
  const dispatch = useDispatch();

  function handleClose() {
    closeDialog();
  }

  function ok() {
    if (Message?.message === 'Unauthorized') {
      dispatch(userProfileAction.clearProfile());
    }
    closeDialog();
    Message?.onOk?.();
  }
  return (
    <Modal>
      <div className='modal-content-body'>
        <p>{Message?.message}</p>
      </div>
      <div className='modal-footer'>
        {(Message?.action === undefined || Message?.action === 'OKCANCEL') && (
          <button onClick={ok} className='btn-modal btn-primary'>
            OK
          </button>
        )}
        {Message?.action === 'OKCANCEL' && (
          <button onClick={handleClose} className='btn-modal btn-secondary '>
            CANCEL
          </button>
        )}
        {Message?.action === 'YESNO' && (
          <button onClick={ok} className='btn-modal btn-primary'>
            YES
          </button>
        )}
        {Message?.action === 'YESNO' && (
          <button onClick={handleClose} className='btn-modal btn-secondary'>
            NO
          </button>
        )}
      </div>
    </Modal>
  );
}
