import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteDesignation } from '../../../repositories/designation-queries';
import SystemModules from '../../../routes';
import { designationModalActions } from '../../../state/reducers/designation-modal-reducer';
import { designationActions } from '../../../state/reducers/designation-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function DesignationButtons() {
  const designationState = useSelector((state: RootState) => state.designation);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(designationActions.setSelected(undefined));
    dispatch(designationModalActions.setDesignation());
    dispatch(designationModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(
      designationModalActions.setDesignation(
        designationState.selectedDesignation!
      )
    );
    dispatch(designationModalActions.setShowModal(true));
  }
  async function nextPage(page: number) {
    dispatch(designationActions.setCurrentPage(page));
    dispatch(designationActions.setInitiateSearch(true));
  }
  async function onDelete() {
    if (!designationState.selectedDesignation?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteDesignation(designationState.selectedDesignation?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected designation has been deleted',
              });
              dispatch(designationActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .then(() => setBusy(false));
      },
    });
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          SystemModules[3].id,
          'Add',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button className='btn-action' title='Add' onClick={add}>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          SystemModules[3].id,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!designationState.selectedDesignation}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          SystemModules[3].id,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!designationState.selectedDesignation}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>

      <Pagination
        pages={designationState.pageCount}
        currentPageNumber={designationState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
