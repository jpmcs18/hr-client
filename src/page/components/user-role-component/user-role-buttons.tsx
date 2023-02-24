import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { userRoleModalActions } from '../../../state/reducers/user-role-modal-reducer';
import { userRoleActions } from '../../../state/reducers/user-role-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function UserRoleButtons({
  onNextPage,
  onDelete,
  page,
  pageCount,
}: {
  onNextPage: (page: number) => {};
  onDelete: () => {};
  page: number;
  pageCount: number;
}) {
  const dispatch = useDispatch();
  const userRoleState = useSelector((state: RootState) => state.userRole);
  function add() {
    dispatch(userRoleActions.setSelected(undefined));
    dispatch(userRoleModalActions.setUserRole());
    dispatch(userRoleModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(userRoleModalActions.setUserRole(userRoleState.selectedUserRole!));
    dispatch(userRoleModalActions.setShowModal(true));
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        <button className='btn-action' title='Add' onClick={add}>
          <FontAwesomeIcon icon={faAdd} />
        </button>
        <button
          className='btn-action'
          disabled={!userRoleState.selectedUserRole}
          onClick={edit}
          title='Edit'>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className='btn-action'
          disabled={!userRoleState.selectedUserRole}
          onClick={onDelete}
          title='Delete'>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <Pagination
        pages={pageCount}
        currentPageNumber={page}
        goInPage={onNextPage}></Pagination>
    </section>
  );
}
