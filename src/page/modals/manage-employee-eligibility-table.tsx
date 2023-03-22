import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { employeeModalActions } from '../../state/reducers/employee-modal-reducer';
import { RootState } from '../../state/store';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomTextBox from '../components/custom-textbox';

export default function ManageOfficePositionsTable() {
  const dispatch = useDispatch();
  const employeeModalState = useSelector(
    (state: RootState) => state.employeeModal
  );
  return (
    <div className='table-container eligibility-management-table'>
      <table className='item-table'>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Eligibility</th>
            <th>Rating</th>
            <th>Place</th>
            <th>Date</th>
            <th>Validity</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {employeeModalState.employeeEligibilities?.map(
            (employeeEligibility) => (
              <tr
                key={employeeEligibility.tempId}
                className={employeeEligibility.deleted ? 'deleted' : ''}>
                <td>
                  <CustomTextBox
                    readonly={true}
                    disabled={employeeEligibility.deleted}
                    value={employeeEligibility.eligibility?.description}
                  />
                </td>
                <td>
                  <CustomTextBox
                    name='rating'
                    placeholder='Rating'
                    disabled={employeeEligibility.deleted}
                    value={employeeEligibility.rating}
                    onChange={(ret) =>
                      dispatch(
                        employeeModalActions.updateEligibility({
                          rowId: employeeEligibility.tempId!,
                          element: ret,
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <CustomTextBox
                    name='place'
                    placeholder='Place'
                    disabled={employeeEligibility.deleted}
                    value={employeeEligibility.place}
                    onChange={(ret) =>
                      dispatch(
                        employeeModalActions.updateEligibility({
                          rowId: employeeEligibility.tempId!,
                          element: ret,
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <CustomDateTimePicker
                    type='date'
                    name='date'
                    placeholder='Date'
                    value={employeeEligibility.date}
                    disabled={employeeEligibility.deleted}
                    onChange={(ret) =>
                      dispatch(
                        employeeModalActions.updateEligibility({
                          rowId: employeeEligibility.tempId!,
                          element: ret,
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <CustomDateTimePicker
                    type='date'
                    name='validity'
                    placeholder='Validity'
                    value={employeeEligibility.validity}
                    disabled={employeeEligibility.deleted}
                    onChange={(ret) =>
                      dispatch(
                        employeeModalActions.updateEligibility({
                          rowId: employeeEligibility.tempId!,
                          element: ret,
                        })
                      )
                    }
                  />
                </td>
                <td className='table-actions' align='center'>
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
