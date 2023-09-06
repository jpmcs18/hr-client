import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dtrExportActions } from '../../../state/reducers/dtr-export-reducer';
import { RootState } from '../../../state/store';

export default function EmployeeItems() {
  const dispatch = useDispatch();
  const dtrExportState = useSelector((state: RootState) => state.dtrExport);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {dtrExportState.employees.map((employee) => (
            <tr
              onClick={() =>
                dispatch(dtrExportActions.setSelectedEmployee(employee))
              }
              key={employee.id}
              className={
                dtrExportState.selectedEmployee?.id === employee.id
                  ? 'selected'
                  : ''
              }>
              <td>{employee.fullName}</td>
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
