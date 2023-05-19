import { useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import { hasAccess } from '../../../helper';
import { RootState } from '../../../state/store';
import EmployeeSearchable from '../../modals/searchables/employee-searchable';
import EmploymentCertificateContractualReport from './employment-certificate-contractual-report';
import EmploymentCertificateRegularReport from './employment-certificate-regular-report';
import ServiceRecordReport from './service-record-report';

export default function ReportPage() {
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  return (
    <div className='report-main-container'>
      {hasAccess(
        userProfileState.moduleRights,
        Pages.Reports,
        'Service Record',
        userProfileState.systemUser?.isAdmin
      ) && <ServiceRecordReport />}
      {hasAccess(
        userProfileState.moduleRights,
        Pages.Reports,
        'Certificate of Employment - Contract of Service',
        userProfileState.systemUser?.isAdmin
      ) && <EmploymentCertificateContractualReport />}
      {hasAccess(
        userProfileState.moduleRights,
        Pages.Reports,
        'Certificate of Employment - Regular',
        userProfileState.systemUser?.isAdmin
      ) && <EmploymentCertificateRegularReport />}
      <>{employeeSearchableState.isModalShow && <EmployeeSearchable />}</>
    </div>
  );
}
