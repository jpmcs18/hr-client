import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import EmployeeItem from './employee-item';

export default function EmployeeItems() {
  const dispatch = useDispatch();
  const employeeState = useSelector((state: RootState) => state.employee);
  return (
    <section>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Office</th>
            <th>Designation</th>
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
