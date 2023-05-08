import { useDispatch, useSelector } from 'react-redux';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import EmployeeItem from './employee-item';

export default function EmployeeItems() {
  const dispatch = useDispatch();
  const employeeState = useSelector((state: RootState) => state.employee);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>ID Number</th>
            <th>Full Name</th>
            <th>Nature of Employment</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Years in Service</th>
            <th>Office</th>
            <th>Position</th>
            <th>Status</th>
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
              <EmployeeItem employee={employee} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
