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
import { deleteOffice } from '../../../repositories/office-queries';
import { officeModalActions } from '../../../state/reducers/office-modal-reducer';
import { officeActions } from '../../../state/reducers/office-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function OfficeButtons() {
  const dispatch = useDispatch();
  const officeState = useSelector((state: RootState) => state.office);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(officeActions.setSelected(undefined));
    dispatch(officeModalActions.setOffice());
    dispatch(officeModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(officeModalActions.setOffice(officeState.selectedOffice!));
    dispatch(officeModalActions.setShowModal(true));
  }
  async function nextPage(page: number) {
    dispatch(officeActions.setCurrentPage(page));
    dispatch(officeActions.setInitiateSearch(true));
  }
  async function onDelete() {
    if (!officeState.selectedOffice?.id) return;

    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteOffice(officeState.selectedOffice?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected office has been deleted',
              });
              dispatch(officeActions.setInitiateSearch(true));
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
          Pages.Offices,
          'Add',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button className='btn-action' title='Add' onClick={add}>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Offices,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!officeState.selectedOffice}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Offices,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!officeState.selectedOffice}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>

      <Pagination
        pages={officeState.pageCount}
        currentPageNumber={officeState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
