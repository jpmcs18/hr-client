import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import printJS from 'print-js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import Employee from '../../../models/entities/Employee';
import { generateServiceRecord } from '../../../repositories/report-queries';
import { employeeSearchableActions } from '../../../state/reducers/employee-searchable-reducer';
import CustomDateTimePicker from '../custom-datetime-picker';
import CustomSelector from '../custom-selector';
import CustomTextBox from '../custom-textbox';

export default function ServiceRecordReport() {
  const dispatch = useDispatch();

  const [employee, setEmployee] = useState<Employee | undefined>();
  const [date, setDate] = useState(() => new Date());
  const [purpose, setPurpose] = useState(() => '');
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  function onCloseEmployeeSearch(employee: Employee | undefined) {
    setEmployee(() => employee);
  }
  async function printSR() {
    if (!employee?.id) {
      setToasterMessage({ content: 'Employee is required.' });
      return;
    }
    if (!date) {
      setToasterMessage({ content: 'Date is required.' });
      return;
    }
    if (!purpose) {
      setToasterMessage({ content: 'Purpose is required.' });
      return;
    }
    setBusy(true);
    await generateServiceRecord(employee?.id ?? 0, date, purpose)
      .then((res) => {
        if (res) {
          print(res);
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => {
        setBusy(false);
      });
  }
  function print(report: string) {
    printJS({
      printable: report.replace('data:application/pdf;base64,', ''),
      type: 'pdf',
      base64: true,
    });
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
            dispatch(employeeSearchableActions.setIsRegular(undefined));
            dispatch(
              employeeSearchableActions.setOnCloseFunction(
                onCloseEmployeeSearch
              )
            );
          }}
          onClear={() => onCloseEmployeeSearch(undefined)}
        />
        <CustomDateTimePicker
          type='date'
          title='Date'
          value={date}
          onChange={(ret) => setDate(ret.value)}
        />
        <CustomTextBox
          title='Purpose'
          value={purpose}
          onChange={(ret) => setPurpose(ret.value)}
        />
      </div>
      <div className='report-footer'>
        <div className='btn-actions-group'>
          <button className='btn-action' onClick={printSR}>
            <FontAwesomeIcon icon={faPrint} />
            <span className='desktop-features'>Print</span>
          </button>
        </div>
      </div>
    </section>
  );
}
