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
import { deletePosition } from '../../../repositories/position-queries';
import { positionModalActions } from '../../../state/reducers/position-modal-reducer';
import { positionActions } from '../../../state/reducers/position-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function PositionButtons() {
  const positionState = useSelector((state: RootState) => state.position);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(positionActions.setSelected(undefined));
    dispatch(positionModalActions.setPosition(undefined));
    dispatch(positionModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(positionModalActions.setPosition(positionState.selectedPosition!));
    dispatch(positionModalActions.setShowModal(true));
  }
  async function nextPage(page: number) {
    dispatch(positionActions.setCurrentPage(page));
    dispatch(positionActions.setInitiateSearch(true));
  }
  async function onDelete() {
    if (!positionState.selectedPosition?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deletePosition(positionState.selectedPosition?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected position has been deleted',
              });
              dispatch(positionActions.setInitiateSearch(true));
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
          Pages.Positions,
          'Add',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button className='btn-action' title='Add' onClick={add}>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Positions,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!positionState.selectedPosition}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Positions,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!positionState.selectedPosition}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>

      <Pagination
        pages={positionState.pageCount}
        currentPageNumber={positionState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
