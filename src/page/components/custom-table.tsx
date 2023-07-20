import React from 'react';
import CustomCheckBox from './custom-checkbox';

export interface TableData {
  id: string;
  text: any;
  isCheckBox?: boolean;
  isChecked?: boolean;
  checkFunction?: () => void;
  function?: () => void;
  colSpan?: number;
  rowSpan?: number;
}
export default function CustomTable({
  headers,
  datas,
  footers,
  selectedRow,
}: {
  headers: TableData[];
  datas: TableData[];
  footers?: TableData[];
  selectedRow?: string;
}) {
  return (
    <div className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            {headers.map((x) => (
              <th key={x.id} colSpan={x.colSpan} rowSpan={x.rowSpan}>
                {x.isCheckBox && (
                  <CustomCheckBox
                    id={x.id}
                    onChange={() => x.checkFunction?.()}
                    isChecked={false}
                  />
                )}
                {x.text}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  );
}
