import React from 'react';
import { toDate } from '../../../helper';
import Employee from '../../../models/entities/Employee';

export default function EmployeeItem({ employee }: { employee: Employee }) {
  return (
    <>
      <td>{employee.fullName}</td>
      <td>{employee.natureOfEmployment?.description}</td>
      <td>{employee.gender?.description}</td>
      <td>{toDate(employee.birthDate)}</td>
      <td>{employee.age}</td>
      <td>{toDate(employee.employmentDate)}</td>
      <td>{employee.yearsInService}</td>
      <td>{employee.office?.description}</td>
      <td>{employee.designation?.description}</td>
      <td>{employee.isActive ? 'Active' : 'Resigned'}</td>
    </>
  );
}
