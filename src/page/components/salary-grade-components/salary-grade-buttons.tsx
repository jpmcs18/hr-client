import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteSalaryGradeBatch } from '../../../repositories/salary-grade-batch-queries';
import { salaryGradeBatchActions } from '../../../state/reducers/salary-grade-batch-reducer';
import { salaryGradeModalActions } from '../../../state/reducers/salary-grade-modal-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function SalaryGradeButtons() {
  const salaryGradeBatchState = useSelector(
    (state: RootState) => state.salaryGradeBatch
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(salaryGradeBatchActions.setSelected(undefined));
    dispatch(salaryGradeModalActions.setSalaryGradeBatch(undefined));
    dispatch(salaryGradeModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(
      salaryGradeModalActions.setSalaryGradeBatch(
        salaryGradeBatchState.selectedSalaryGradeBatch!
      )
    );
    dispatch(salaryGradeModalActions.setShowModal(true));
  }
  async function nextPage(page: number) {
    dispatch(salaryGradeBatchActions.setCurrentPage(page));
    dispatch(salaryGradeBatchActions.setInitiateSearch(true));
  }
  async function onDelete() {
    if (!salaryGradeBatchState.selectedSalaryGradeBatch?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteSalaryGradeBatch(
          salaryGradeBatchState.selectedSalaryGradeBatch?.id ?? 0
        )
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected salary grade batch has been deleted',
              });
              dispatch(salaryGradeBatchActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .finally(() => setBusy(false));
      },
    });
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.SalaryGrade,
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
          Pages.SalaryGrade,
          'Edit',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!salaryGradeBatchState.selectedSalaryGradeBatch}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.SalaryGrade,
          'Delete',
          userProfileState.systemUser?.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!salaryGradeBatchState.selectedSalaryGradeBatch}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>

      <Pagination
        pages={salaryGradeBatchState.pageCount}
        currentPageNumber={salaryGradeBatchState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
