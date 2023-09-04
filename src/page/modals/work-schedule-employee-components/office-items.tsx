import Office from '../../../models/entities/Office';
import CustomCheckBox from '../../components/custom-checkbox';

export default function OfficeItems({
  offices,
  selected,
  isHeadChecked,
  headCheckChange,
  itemCheckChange,
  onSelectedChange,
}: {
  offices: Office[];
  selected: Office | undefined;
  isHeadChecked: boolean;
  headCheckChange: () => void;
  itemCheckChange: (office: Office) => void;
  onSelectedChange: (office: Office) => void;
}) {
  return (
    <div className='table-container office-table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th className='checker'>
              <CustomCheckBox
                isChecked={isHeadChecked}
                onChange={headCheckChange}
              />
            </th>
            <th>Office</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((office) => (
            <tr
              onClick={() => onSelectedChange(office)}
              key={office.id}
              className={selected?.id === office.id ? 'selected' : ''}>
              <td>
                <CustomCheckBox
                  isChecked={office.isChecked ?? false}
                  onChange={() => itemCheckChange(office)}
                />
              </td>
              <td>{office.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
