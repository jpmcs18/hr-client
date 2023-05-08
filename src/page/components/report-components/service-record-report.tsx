import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Employee from '../../../models/entities/Employee';
import { employeeSearchableActions } from '../../../state/reducers/employee-searchable-reducer';
import { RootState } from '../../../state/store';
import EmployeeSearchable from '../../modals/searchables/employee-searchable';
import CustomSelector from '../custom-selector';
import CustomTextBox from '../custom-textbox';

export default function ServiceRecordReport() {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState<Employee | undefined>();
  function onCloseEmployeeSearch(employee: Employee) {
    setEmployee(() => employee);
  }
  return (
    <section className='report-container'>
      <div className='report-header'>Service Record</div>
      <div className='report-body'>
        <CustomSelector
          title='Employee'
          value={employee?.fullName}
          onSelectorClick={() => {
            dispatch(employeeSearchableActions.setShowModal(true));
            dispatch(
              employeeSearchableActions.setOnCloseFunction(
                onCloseEmployeeSearch
              )
            );
          }}
        />
        <CustomTextBox title='Purpose' />
      </div>
      <div className='report-footer'>
        <div className='btn-actions-group'>
          <button className='btn-action'>
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>
    </section>
  );
}
