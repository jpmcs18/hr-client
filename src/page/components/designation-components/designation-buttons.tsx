import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { designationModalActions } from '../../../state/reducers/designation-modal-reducer';
import { designationActions } from '../../../state/reducers/designation-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function DesignationButtons({
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
  const designationState = useSelector((state: RootState) => state.designation);
  function add() {
    dispatch(designationActions.setSelected(undefined));
    dispatch(
      designationModalActions.setDesignation({ id: 0, description: '' })
    );
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
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        <button className='btn-action' title='Add' onClick={add}>
          <FontAwesomeIcon icon={faAdd} />
        </button>
        <button
          className='btn-action'
          disabled={!designationState.selectedDesignation}
          onClick={edit}
          title='Edit'>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className='btn-action'
          disabled={!designationState.selectedDesignation}
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
