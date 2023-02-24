import React from 'react';
import Employee from '../../../models/entities/Employee';

export default function EmployeeItem({ employee }: { employee: Employee }) {
  return (
    <>
      <td>{employee.fullName}</td>
      <td>{employee.office?.description}</td>
      <td>{employee.designation?.description}</td>
    </>
  );
}
