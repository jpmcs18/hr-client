import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchEmployee } from '../../../repositories/employee-queries';
import { employeeSearchableActions } from '../../../state/reducers/employee-searchable-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../../components/pagination';
import SearchBar from '../../components/searchbar';
import Modal from '../modal';

export default function EmployeeSearchable() {
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchDes();
    },
    //eslint-disable-next-line
    [employeeSearchableState.initiateSearch]
  );

  async function searchDes() {
    if (!employeeSearchableState.initiateSearch) return true;
    setBusy(true);
    dispatch(employeeSearchableActions.setInitiateSearch(false));
    await searchEmployee(
      employeeSearchableState.key,
      employeeSearchableState.currentPage,
      employeeSearchableState.isRegular
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(employeeSearchableActions.fill(res.results));
          dispatch(employeeSearchableActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(employeeSearchableActions.setkey(key));
    dispatch(employeeSearchableActions.setCurrentPage(1));
    dispatch(employeeSearchableActions.setInitiateSearch(true));
  }
  function onClose(hasReturn: boolean) {
    dispatch(employeeSearchableActions.setShowModal(false));
    if (hasReturn) {
      employeeSearchableState.onCloseFunction?.(
        employeeSearchableState.selectedEmployee!
      );
    }
  }
  async function nextPage(page: number) {
    dispatch(employeeSearchableActions.setCurrentPage(page));
    dispatch(employeeSearchableActions.setInitiateSearch(true));
  }
  return (
    <Modal
      className='searchable-modal'
      onClose={() => onClose(false)}
      title={'Search Employee'}>
      <div className='modal-content-body employee-searchable-content-body'>
        <div>
          <SearchBar
            search={search}
            placeholder='Search Key'
            value={employeeSearchableState.key}
          />
        </div>
        <div>
          <Pagination
            pages={employeeSearchableState.pageCount}
            currentPageNumber={employeeSearchableState.currentPage}
            goInPage={nextPage}></Pagination>
        </div>
        <div className='searchable-table table-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Office</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {employeeSearchableState.employees.map((employee) => (
                <tr
                  onClick={() =>
                    dispatch(employeeSearchableActions.setSelected(employee))
                  }
                  key={employee.id}
                  className={
                    employeeSearchableState.selectedEmployee?.id === employee.id
                      ? 'selected'
                      : ''
                  }>
                  <td>{employee.fullName}</td>
                  <td>
                    <div>{employee.office?.description}</div>
                    {employee.detailedOffice && (
                      <i>
                        <b>Detailed:</b> {employee.detailedOffice?.description}
                      </i>
                    )}
                  </td>
                  <td>
                    <div>{employee.position?.description}</div>
                    {employee.detailedPosition && (
                      <i>
                        <b>Detailed:</b>{' '}
                        {employee.detailedPosition?.description}
                      </i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button
            disabled={!employeeSearchableState.selectedEmployee}
            onClick={() => onClose(true)}
            className='btn-action'>
            <FontAwesomeIcon icon={faCheck} />
            <span className='desktop-features'>Select</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
