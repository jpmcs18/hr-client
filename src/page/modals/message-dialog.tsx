import {
  faCancel,
  faCheck,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { AppName } from '../../constant';
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
    <Modal title={AppName}>
      <div className='modal-content-body'>
        <span style={{ whiteSpace: 'pre-line' }}>{Message?.message}</span>
      </div>
      <div className='modal-footer'>
        {Message?.action === 'OKCANCEL' && (
          <div className='btn-actions-group'>
            <button onClick={handleClose} className='btn-action btn-secondary '>
              <FontAwesomeIcon icon={faCancel} />
              <span className='desktop-features'>Cancel</span>
            </button>
          </div>
        )}
        {(Message?.action === undefined || Message?.action === 'OKCANCEL') && (
          <div className='btn-actions-group'>
            <button onClick={ok} className='btn-action btn-primary'>
              <FontAwesomeIcon icon={faCheck} />
              <span className='desktop-features'>Ok</span>
            </button>
          </div>
        )}
        {Message?.action === 'YESNO' && (
          <div className='btn-actions-group'>
            <button onClick={handleClose} className='btn-action btn-secondary'>
              <FontAwesomeIcon icon={faThumbsDown} />
              <span className='desktop-features'>No</span>
            </button>
          </div>
        )}
        {Message?.action === 'YESNO' && (
          <div className='btn-actions-group'>
            <button onClick={ok} className='btn-action btn-primary'>
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className='desktop-features'>Yes</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
