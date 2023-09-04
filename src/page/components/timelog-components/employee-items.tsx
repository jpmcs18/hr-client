import { useDispatch, useSelector } from 'react-redux';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';

export default function EmployeeItems() {
  const dispatch = useDispatch();
  const employeeState = useSelector((state: RootState) => state.employee);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Office</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employeeState.employees.map((employee) => (
            <tr
              onClick={() => dispatch(employeeActions.setSelected(employee))}
              key={employee.id}
              className={
                employeeState.selectedEmployee?.id === employee.id
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
                    <b>Detailed:</b> {employee.detailedPosition?.description}
                  </i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
