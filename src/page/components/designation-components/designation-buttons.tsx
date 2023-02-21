import {
  faAdd,
  faArrowRightArrowLeft,
  faEdit,
  faEye,
  faList,
  faPrint,
  faRefresh,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useSetToasterMessage } from '../../../custom-hooks/authorize-provider';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function EmployeeButtons({
  onNextPage,
}: {
  onNextPage: (page: number) => {};
}) {
  const dispatch = useDispatch();
  const employeeState = useSelector((state: RootState) => state.employee);
  const setToasterMessage = useSetToasterMessage();
  function add() {
    dispatch(employeeActions.setSelected(undefined));
    dispatch(employeeActions.setShowModal(true));
  }
  function edit() {}
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
          title='Delete'>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <Pagination
        pages={employeeState.pageCount}
        currentPageNumber={employeeState.currentPage}
        goInPage={onNextPage}></Pagination>
    </section>
  );
}
