import { faAdd, faClose, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { DeleteEmployeeScheduleByCheckedEmployees } from '../../../repositories/employee-schedule-queries';
import { employeeScheduleModalActions } from '../../../state/reducers/employee-schedule-modal-reducer';
import { workScheduleEmployeeModalActions } from '../../../state/reducers/work-schedule-employee-modal-reducer';
import { RootState } from '../../../state/store';

export default function WorkScheduleEmployeeButtons() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const workScheduleEmployeeModalState = useSelector(
    (state: RootState) => state.workScheduleEmployeeModal
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  function add() {
    dispatch(
      employeeScheduleModalActions.setWorkScheduleId(
        workScheduleEmployeeModalState.workSchedule?.id
      )
    );
    dispatch(employeeScheduleModalActions.setShowModal(true));
  }
  async function onDelete() {
    if (
      !workScheduleEmployeeModalState.employees.filter((x) => x.isChecked)
        .length
    ) {
      setToasterMessage({ content: 'Check an employee first.' });
      return;
    }
    setBusy(true);
    await DeleteEmployeeScheduleByCheckedEmployees(
      workScheduleEmployeeModalState.workSchedule?.id ?? 0,
      workScheduleEmployeeModalState.employees
        .filter((x) => x.isChecked)
        .map((x) => x.id)
    )
      .then((res) => {
        if (res) {
          setToasterMessage({ content: 'Delete Successful.' });
          dispatch(workScheduleEmployeeModalActions.removeEmployees());
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  return (
    <div className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.EmployeeSchedule,
          'Add',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button className='btn-action' title='Add' onClick={add}>
            <FontAwesomeIcon icon={faAdd} />
            <span className='desktop-features'>Add</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.EmployeeSchedule,
          'Delete Checked Employee',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button className='btn-action' onClick={onDelete} title='Delete'>
            <span>
              <FontAwesomeIcon icon={faClose} />
              <FontAwesomeIcon icon={faUserCheck} />
            </span>
            <span className='desktop-features'>Delete Checked Employee</span>
          </button>
        )}
      </div>
    </div>
  );
}
