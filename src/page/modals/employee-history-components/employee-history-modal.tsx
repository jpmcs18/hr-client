import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSetBusy } from '../../../custom-hooks/authorize-provider';
import { getEmployeeHistories } from '../../../repositories/employee-history-queries';
import { getPersonalHistories } from '../../../repositories/personal-history-queries';
import { employeeHistoryModalActions } from '../../../state/reducers/employee-history-modal-reducer';
import { RootState } from '../../../state/store';
import Modal from '../modal';
import EmploymentHistory from './employment-history';
import PersonalHistory from './personal-history';

export default function EmployeeHistoryModal() {
  const dispatch = useDispatch();
  const employeeHistoryModalState = useSelector(
    (state: RootState) => state.employeeHistoryModal
  );
  const setBusy = useSetBusy();
  function onModalClose() {
    dispatch(employeeHistoryModalActions.setShowModal(false));
  }
  useEffect(
    () => {
      fetchEmploymentHistory();
      fetchPersonalHistory();
    },
    //eslint-disable-next-line
    [employeeHistoryModalState.employee]
  );
  useEffect(
    () => {
      if (employeeHistoryModalState.employeeHistorySearch.initiateSearch) {
        dispatch(
          employeeHistoryModalActions.setEmployeeHistorySearch({
            elementName: 'initiateSearch',
            value: false,
          })
        );
        fetchEmploymentHistory();
      }
    },
    //eslint-disable-next-line
    [employeeHistoryModalState.employeeHistorySearch.initiateSearch]
  );
  useEffect(
    () => {
      if (employeeHistoryModalState.personalHistorySearch.initiateSearch) {
        dispatch(
          employeeHistoryModalActions.setPersonalHistorySearch({
            elementName: 'initiateSearch',
            value: false,
          })
        );
        fetchPersonalHistory();
      }
    },
    //eslint-disable-next-line
    [employeeHistoryModalState.personalHistorySearch.initiateSearch]
  );
  async function fetchEmploymentHistory() {
    if (employeeHistoryModalState.employee) {
      setBusy(true);
      await getEmployeeHistories(
        employeeHistoryModalState.employee.id,
        employeeHistoryModalState.employeeHistorySearch.currentPage
      )
        .then((res) => {
          if (res) {
            dispatch(
              employeeHistoryModalActions.fillEmployeeHistory(res.results)
            );
            dispatch(
              employeeHistoryModalActions.setEmployeeHistorySearch({
                elementName: 'pageCount',
                value: res.pageCount,
              })
            );
          }
        })
        .finally(() => setBusy(false));
    }
  }
  async function fetchPersonalHistory() {
    if (employeeHistoryModalState.employee) {
      setBusy(true);
      await getPersonalHistories(
        employeeHistoryModalState.employee.id,
        employeeHistoryModalState.employeeHistorySearch.currentPage
      )
        .then((res) => {
          if (res) {
            dispatch(
              employeeHistoryModalActions.fillPersonalHistory(res.results)
            );
            dispatch(
              employeeHistoryModalActions.setPersonalHistorySearch({
                elementName: 'pageCount',
                value: res.pageCount,
              })
            );
          }
        })
        .finally(() => setBusy(false));
    }
  }
  return (
    <Modal
      className='employee-history-modal'
      onClose={onModalClose}
      title='Employee History'>
      <div className='modal-content-body employee-history-modal-content-body'>
        <div className='tab-container'>
          <div className='tab-header-container'>
            <div
              className={
                'tab-header' +
                (employeeHistoryModalState.selectedTab === 1 ? ' selected' : '')
              }
              onClick={() =>
                dispatch(employeeHistoryModalActions.setSelectedTab(1))
              }>
              Service Record
            </div>
            <div
              className={
                'tab-header' +
                (employeeHistoryModalState.selectedTab === 2 ? ' selected' : '')
              }
              onClick={() =>
                dispatch(employeeHistoryModalActions.setSelectedTab(2))
              }>
              Personal History
            </div>
          </div>
          <div className='tab-content-container'>
            <div
              className={
                'tab-content' +
                (employeeHistoryModalState.selectedTab === 1
                  ? ' selected-tab'
                  : '')
              }>
              <EmploymentHistory />
            </div>
            <div
              className={
                'tab-content' +
                (employeeHistoryModalState.selectedTab === 2
                  ? ' selected-tab'
                  : '')
              }>
              <PersonalHistory />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
