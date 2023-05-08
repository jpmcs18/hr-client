import React from 'react';
import { toDate } from '../../../helper';
import Employee from '../../../models/entities/Employee';

export default function EmployeeItem({ employee }: { employee: Employee }) {
  return (
    <>
      <td>{employee.idNumber}</td>
      <td>{employee.fullName}</td>
      <td>{employee.natureOfEmployment?.description}</td>
      <td>{employee.gender?.description}</td>
      <td>{employee.age}</td>
      <td>{employee.yearsInService}</td>
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
      <td>
        <div>{employee.isActive ? 'Active' : 'Separated'}</div>
        <div>{employee.isActive ? '' : toDate(employee.resignationDate)}</div>
      </td>
    </>
  );
}
