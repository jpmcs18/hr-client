import {
  faAdd,
  faEdit,
  faPrint,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess, printPDFReport } from '../../../helper';
import {
  deleteTimeLog,
  generateActualTimeLogs,
} from '../../../repositories/timelog-queries';
import { timelogModalActions } from '../../../state/reducers/timelog-modal-reducer';
import { timelogActions } from '../../../state/reducers/timelog-reducer';
import { RootState } from '../../../state/store';
import TimeLog from '../../../models/entities/TimeLog';
import printJS from 'print-js';

export default function TimeLogButtons() {
  const timelogState = useSelector((state: RootState) => state.timelog);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(timelogActions.setSelectedTimeLog(undefined));
    dispatch(
      timelogModalActions.setTimeLog({
        id: 0,
        employeeId: timelogState.selectedEmployee?.id ?? 0,
        loginDate: undefined,
        logoutDate: undefined,
        areaInId: undefined,
        areaOutId: undefined,
      } as TimeLog)
    );
    dispatch(timelogModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(timelogModalActions.setTimeLog(timelogState.selectedTimelog!));
    dispatch(timelogModalActions.setShowModal(true));
  }
  async function onDelete() {
    if (!timelogState.selectedTimelog?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteTimeLog(timelogState.selectedTimelog?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected timelog deleted',
              });
              dispatch(timelogActions.setRefreshTimelog(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .finally(() => setBusy(false));
      },
    });
  }
  async function printActual() {
    setBusy(true);
    await generateActualTimeLogs(
      timelogState.selectedEmployee?.id ?? 0,
      timelogState.startDate,
      timelogState.endDate
    )
      .then((res) => {
        if (res) {
          printPDFReport(res);
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => {
        setBusy(false);
      });
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.TimeLogs,
          'Add',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            title='Add'
            onClick={add}
            disabled={!timelogState.selectedEmployee}>
            <FontAwesomeIcon icon={faAdd} />
            <span className='desktop-features'>Add</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.TimeLogs,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!timelogState.selectedTimelog}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.TimeLogs,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!timelogState.selectedTimelog}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.TimeLogs,
          'Print Actual Time Log',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            onClick={printActual}
            disabled={!timelogState.timelogs.length}>
            <FontAwesomeIcon icon={faPrint} />
            <span className='desktop-features'>Print Actual Time Log</span>
          </button>
        )}
      </div>
    </section>
  );
}
