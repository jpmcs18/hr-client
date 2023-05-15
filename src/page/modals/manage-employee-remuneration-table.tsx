import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { employeeModalActions } from '../../state/reducers/employee-modal-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';
import CustomNumber from '../components/custom-number';
import CustomTextBox from '../components/custom-textbox';

export default function ManageEmployeeRemunerationTable() {
  const dispatch = useDispatch();
  const employeeModalState = useSelector(
    (state: RootState) => state.employeeModal
  );
  return (
    <div className='manage-container'>
      <CustomDropdown
        title='Remuneration'
        onChange={(ret) => {
          dispatch(employeeModalActions.addNewRemuneration(ret.value));
        }}
        itemsList={employeeModalState.remunerations.map((x) => {
          return {
            key: x.id.toString(),
            value: x.description,
          };
        })}
      />
      <div className='table-container eligibility-management-table'>
        <table className='item-table'>
          <thead>
            <tr>
              <th style={{ width: '70%' }}>
                Other Remuneration/s (Allowances/Monetary Benefits)
              </th>
              <th>Amount</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {employeeModalState.employeeRemunerations?.map((x) => (
              <tr key={x.tempId} className={x.deleted ? 'deleted' : ''}>
                <td>
                  <CustomTextBox
                    readonly={true}
                    disabled={x.deleted}
                    value={x.remuneration?.description}
                  />
                </td>
                <td>
                  <CustomNumber
                    type='amount'
                    placeholder='Amount...'
                    value={x.tempAmount}
                    onChange={(ret) =>
                      dispatch(
                        employeeModalActions.updateRemuneration({
                          rowId: x.tempId!,
                          value: ret.value,
                        })
                      )
                    }
                  />
                </td>
                <td className='table-actions' align='center'>
                  {x.deleted && (
                    <FontAwesomeIcon
                      icon={faUndo}
                      className='action-icon table-icon-button'
                      onClick={() => {
                        dispatch(
                          employeeModalActions.undoDeleteRemuneration(x.id)
                        );
                      }}
                      title='Undo'
                    />
                  )}
                  {!x.deleted && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className='action-icon table-icon-button'
                      onClick={() => {
                        dispatch(employeeModalActions.deleteRemuneration(x));
                      }}
                      title='Delete'
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
