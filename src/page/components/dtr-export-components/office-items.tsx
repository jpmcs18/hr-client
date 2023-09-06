import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dtrExportActions } from '../../../state/reducers/dtr-export-reducer';
import { RootState } from '../../../state/store';

export default function OfficeItems() {
  const dispatch = useDispatch();
  const dtrExportState = useSelector((state: RootState) => state.dtrExport);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Head</th>
          </tr>
        </thead>
        <tbody>
          {dtrExportState.offices.map((office) => (
            <tr
              onClick={() => {
                dispatch(dtrExportActions.setSelectedOffice(office));
                dispatch(
                  dtrExportActions.setEmployeeSearch({
                    elementName: 'currentPage',
                    value: 1,
                  })
                );
                dispatch(
                  dtrExportActions.setEmployeeSearch({
                    elementName: 'initiateSearch',
                    value: true,
                  })
                );
              }}
              key={office.id}
              className={
                dtrExportState.selectedOffice?.id === office.id
                  ? 'selected'
                  : ''
              }>
              <td>{office.description}</td>
              <td>{office.departmentHead?.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
