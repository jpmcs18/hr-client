import React from 'react';
import Employee from '../../../entities/Employee';

export default function EmployeeItem({ employee }: { employee: Employee }) {
  return (
    <>
      <td>{employee.fullName}</td>
      <td>{employee.designation?.description}</td>
    </>
  );
}
