import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import EmployeeSearchable from '../../modals/searchables/employee-searchable';
import EmploymentCertificateReport from './employment-certificate-contractual-report';
import ServiceRecordReport from './service-record-report';

export default function ReportPage() {
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );
  return (
    <div className='report-main-container'>
      <ServiceRecordReport />
      <EmploymentCertificateReport />
      <>{employeeSearchableState.isModalShow && <EmployeeSearchable />}</>
    </div>
  );
}
