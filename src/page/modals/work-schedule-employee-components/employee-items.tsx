import Employee from '../../../models/entities/Employee';
import CustomCheckBox from '../../components/custom-checkbox';

export default function EmployeeItems({
  employees,
  selected,
  isHeadChecked,
  headCheckChange,
  itemCheckChange,
  onSelectedChange,
}: {
  employees: Employee[];
  selected: Employee | undefined;
  isHeadChecked: boolean;
  headCheckChange: () => void;
  itemCheckChange: (employee: Employee) => void;
  onSelectedChange: (employee: Employee) => void;
}) {
  return (
    <div className='table-container employe-table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th className='checker'>
              <CustomCheckBox
                isChecked={isHeadChecked}
                onChange={headCheckChange}
              />
            </th>
            <th>ID Number</th>
            <th>Full Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              onClick={() => onSelectedChange(employee)}
              key={employee.id}
              className={selected?.id === employee.id ? 'selected' : ''}>
              <td>
                <CustomCheckBox
                  isChecked={employee.isChecked ?? false}
                  onChange={() => itemCheckChange(employee)}
                />
              </td>
              <td>{employee.idNumber}</td>
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
    </div>
  );
}
