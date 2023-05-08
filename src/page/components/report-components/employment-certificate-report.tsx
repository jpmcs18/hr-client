import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CustomSelector from '../custom-selector';
import CustomTextBox from '../custom-textbox';

export default function EmploymentCertificateReport() {
  return (
    <section className='report-container'>
      <div className='report-header'>Certificate of Employment</div>
      <div className='report-body'>
        <CustomSelector title='Employee' />
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
