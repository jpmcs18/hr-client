import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { officeModalActions } from '../../../state/reducers/office-modal-reducer';
import { officeActions } from '../../../state/reducers/office-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function OfficeButtons({
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
  const officeState = useSelector((state: RootState) => state.office);
  function add() {
    dispatch(officeActions.setSelected(undefined));
    dispatch(
      officeModalActions.setOffice({
        id: 0,
        description: '',
        abbreviation: '',
        designations: [],
      })
    );
    dispatch(officeModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(officeModalActions.setOffice(officeState.selectedOffice!));
    dispatch(officeModalActions.setShowModal(true));
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        <button className='btn-action' title='Add' onClick={add}>
          <FontAwesomeIcon icon={faAdd} />
        </button>
        <button
          className='btn-action'
          disabled={!officeState.selectedOffice}
          onClick={edit}
          title='Edit'>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className='btn-action'
          disabled={!officeState.selectedOffice}
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
