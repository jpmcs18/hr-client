import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteTimeLog } from '../../../repositories/timelog-queries';
import { timelogModalActions } from '../../../state/reducers/timelog-modal-reducer';
import { timelogActions } from '../../../state/reducers/timelog-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function TimeLogButtons() {
  const timelogState = useSelector((state: RootState) => state.timelog);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(timelogActions.setSelectedTimeLog(undefined));
    dispatch(timelogModalActions.setTimeLog(undefined));
    dispatch(timelogModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(timelogModalActions.setTimeLog(timelogState.selectedTimelog!));
    dispatch(timelogModalActions.setShowModal(true));
  }
  async function onDelete() {
    if (!timelogState.selectedTimelog?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteTimeLog(timelogState.selectedTimelog?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected timelog deleted',
              });
              dispatch(timelogActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .finally(() => setBusy(false));
      },
    });
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.TimeLogs,
          'Add',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button className='btn-action' title='Add' onClick={add}>
            <FontAwesomeIcon icon={faAdd} />
            <span className='desktop-features'>Add</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.TimeLogs,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!timelogState.selectedTimelog}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.TimeLogs,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!timelogState.selectedTimelog}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>
    </section>
  );
}
