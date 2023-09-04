import {
  faAdd,
  faEdit,
  faTrash,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteWorkSchedule } from '../../../repositories/work-schedule-queries';
import { workScheduleEmployeeModalActions } from '../../../state/reducers/work-schedule-employee-modal-reducer';
import { workScheduleModalActions } from '../../../state/reducers/work-schedule-modal-reducer';
import { workScheduleActions } from '../../../state/reducers/work-schedule-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function WorkScheduleButtons() {
  const workScheduleState = useSelector(
    (state: RootState) => state.workSchedule
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(workScheduleActions.setSelected(undefined));
    dispatch(workScheduleModalActions.setWorkSchedule(undefined));
    dispatch(workScheduleModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(
      workScheduleModalActions.setWorkSchedule(
        workScheduleState.selectedWorkSchedule!
      )
    );
    dispatch(workScheduleModalActions.setShowModal(true));
  }
  async function nextPage(page: number) {
    dispatch(workScheduleActions.setCurrentPage(page));
    dispatch(workScheduleActions.setInitiateSearch(true));
  }
  async function onDelete() {
    if (!workScheduleState.selectedWorkSchedule?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteWorkSchedule(
          workScheduleState.selectedWorkSchedule?.id ?? 0
        )
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected workSchedule deleted',
              });
              dispatch(workScheduleActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .finally(() => setBusy(false));
      },
    });
  }
  function manageEmployee() {
    dispatch(
      workScheduleEmployeeModalActions.setWorkSchedule(
        workScheduleState.selectedWorkSchedule
      )
    );
    dispatch(workScheduleEmployeeModalActions.setShowModal(true));
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.WorkSchedules,
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
          Pages.WorkSchedules,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!workScheduleState.selectedWorkSchedule}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.WorkSchedules,
          'Employees',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!workScheduleState.selectedWorkSchedule}
            onClick={manageEmployee}
            title='Employees'>
            <FontAwesomeIcon icon={faUsers} />
            <span className='desktop-features'>Employees</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.WorkSchedules,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!workScheduleState.selectedWorkSchedule}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>
      <Pagination
        pages={workScheduleState.pageCount}
        currentPageNumber={workScheduleState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
