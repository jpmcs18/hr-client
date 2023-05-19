import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess, toDate } from '../../../helper';
import { deletePersonalHistory } from '../../../repositories/personal-history-queries';
import { employeeHistoryModalActions } from '../../../state/reducers/employee-history-modal-reducer';
import { personalHistoryModalActions } from '../../../state/reducers/personal-history-modal-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../../components/pagination';
import ManagePersonalHistory from '../manage-personal-history';

export default function PersonalHistory() {
  const employeeHistoryModalState = useSelector(
    (state: RootState) => state.employeeHistoryModal
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const personalHistoryModalState = useSelector(
    (state: RootState) => state.personalHistoryModal
  );
  const dispatch = useDispatch();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  function addHistory() {
    dispatch(
      personalHistoryModalActions.setPersonalHistory({
        id: 0,
        employeeId: employeeHistoryModalState.employee?.id ?? 0,
      })
    );
    dispatch(personalHistoryModalActions.setShowModal(true));
  }
  function editHistory() {
    dispatch(
      personalHistoryModalActions.setPersonalHistory(
        employeeHistoryModalState.selectedPersonalHistory
      )
    );
    dispatch(personalHistoryModalActions.setShowModal(true));
  }
  async function deleteHistory() {
    if (!employeeHistoryModalState.selectedPersonalHistory?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deletePersonalHistory(
          employeeHistoryModalState.selectedPersonalHistory?.id ?? 0
        )
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected personal history has been deleted',
              });
              dispatch(
                employeeHistoryModalActions.setPersonalHistorySearch({
                  elementName: 'initiateSearch',
                  value: true,
                })
              );
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
    <>
      <section className='btn-actions-group-container'>
        <div className='btn-actions-group'>
          {hasAccess(
            userProfileState.moduleRights,
            Pages.PersonalHistory,
            'Add',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button className='btn-action' title='Add' onClick={addHistory}>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          )}
          {hasAccess(
            userProfileState.moduleRights,
            Pages.PersonalHistory,
            'Edit',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button
              className='btn-action'
              disabled={!employeeHistoryModalState.selectedPersonalHistory}
              onClick={editHistory}
              title='Edit'>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
          {hasAccess(
            userProfileState.moduleRights,
            Pages.PersonalHistory,
            'Delete',
            userProfileState.systemUser?.isAdmin
          ) && (
            <button
              className='btn-action'
              disabled={!employeeHistoryModalState.selectedPersonalHistory}
              onClick={deleteHistory}
              title='Delete'>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>

        <Pagination
          pages={employeeHistoryModalState.personalHistorySearch.pageCount}
          currentPageNumber={
            employeeHistoryModalState.personalHistorySearch.currentPage
          }
          goInPage={(page) => {
            dispatch(
              employeeHistoryModalActions.setPersonalHistorySearch({
                elementName: 'currentPage',
                value: page,
              })
            );

            dispatch(
              employeeHistoryModalActions.setPersonalHistorySearch({
                elementName: 'initiateSearch',
                value: true,
              })
            );
          }}></Pagination>
      </section>
      <section className='table-container employee-history-table-container'>
        <table className='item-table'>
          <thead>
            <tr>
              <th style={{ minWidth: '15em' }}>Inclusive Date</th>
              <th style={{ minWidth: '20em' }}>Full Name</th>
              <th>Contact No.</th>
              <th>Email Address</th>
              <th>Civil Status</th>
            </tr>
          </thead>
          <tbody>
            {employeeHistoryModalState.personalHistories.map((history) => (
              <tr
                onClick={() =>
                  dispatch(
                    employeeHistoryModalActions.setSelectedPersonalHistory(
                      history
                    )
                  )
                }
                key={history.id}
                className={
                  employeeHistoryModalState.selectedPersonalHistory?.id ===
                  history.id
                    ? 'selected'
                    : ''
                }>
                <td>
                  {toDate(history.startDate)} -{' '}
                  {history.endDate ? toDate(history.endDate) : 'PRESENT'}
                </td>
                <td>{history.fullName}</td>
                <td>{history.contactNumber}</td>
                <td>{history.emailAddress}</td>
                <td>{history.civilStatus?.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <>{personalHistoryModalState.isModalShow && <ManagePersonalHistory />}</>
    </>
  );
}
