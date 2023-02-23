import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useSetToasterMessage } from '../../../custom-hooks/authorize-provider';
import { employeeModalActions } from '../../../state/reducers/employee-modal-reducer';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function EmployeeButtons({
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
  const employeeState = useSelector((state: RootState) => state.employee);
  const setToasterMessage = useSetToasterMessage();
  function add() {
    dispatch(employeeActions.setSelected(undefined));
    dispatch(employeeModalActions.setEmployee());
    dispatch(employeeModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(employeeModalActions.setEmployee(employeeState.selectedEmployee!));
    dispatch(employeeModalActions.setShowModal(true));
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        <button className='btn-action' title='Add' onClick={add}>
          <FontAwesomeIcon icon={faAdd} />
        </button>
        <button
          className='btn-action'
          disabled={!employeeState.selectedEmployee}
          onClick={edit}
          title='Edit'>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className='btn-action'
          disabled={!employeeState.selectedEmployee}
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
