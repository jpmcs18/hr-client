import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { employeeModalActions } from '../../state/reducers/employee-modal-reducer';
import { RootState } from '../../state/store';

export default function ManageOfficeDesignationsTable() {
  const dispatch = useDispatch();
  const employeeModalState = useSelector(
    (state: RootState) => state.employeeModal
  );
  return (
    <div className='table-container eligibility-management-table'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Employee Eligibilities</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {employeeModalState.employeeEligibilities?.map(
            (employeeEligibility) => (
              <tr
                key={employeeEligibility.tempId}
                className={employeeEligibility.deleted ? 'deleted' : ''}>
                <td>{employeeEligibility.eligibility?.description}</td>
                <td className='table-actions'>
                  {employeeEligibility.deleted && (
                    <FontAwesomeIcon
                      icon={faUndo}
                      className='action-icon table-icon-button'
                      onClick={() => {
                        dispatch(
                          employeeModalActions.undoDeleteEligibility(
                            employeeEligibility.id
                          )
                        );
                      }}
                      title='Undo'
                    />
                  )}
                  {!employeeEligibility.deleted && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className='action-icon table-icon-button'
                      onClick={() => {
                        dispatch(
                          employeeModalActions.deleteEligibility(
                            employeeEligibility
                          )
                        );
                      }}
                      title='Delete'
                    />
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
