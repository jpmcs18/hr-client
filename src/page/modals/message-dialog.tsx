import {
  faCancel,
  faCheck,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <div className='btn-actions-group'>
          {Message?.action === 'OKCANCEL' && (
            <button onClick={handleClose} className='btn-action btn-secondary '>
              <FontAwesomeIcon icon={faCancel} />
              <span className='desktop-features'>Cancel</span>
            </button>
          )}
        </div>
        <div className='btn-actions-group'>
          {(Message?.action === undefined ||
            Message?.action === 'OKCANCEL') && (
            <button onClick={ok} className='btn-action btn-primary'>
              <FontAwesomeIcon icon={faCheck} />
              <span className='desktop-features'>Ok</span>
            </button>
          )}
        </div>
        <div className='btn-actions-group'>
          {Message?.action === 'YESNO' && (
            <button onClick={handleClose} className='btn-action btn-secondary'>
              <FontAwesomeIcon icon={faThumbsDown} />
              <span className='desktop-features'>No</span>
            </button>
          )}
        </div>
        <div className='btn-actions-group'>
          {Message?.action === 'YESNO' && (
            <button onClick={ok} className='btn-action btn-primary'>
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className='desktop-features'>Yes</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
