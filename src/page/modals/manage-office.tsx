import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import Employee from '../../models/entities/Employee';
import { insertOffice, updateOffice } from '../../repositories/office-queries';
import { getPositions } from '../../repositories/position-queries';
import { employeeSearchableActions } from '../../state/reducers/employee-searchable-reducer';
import { officeModalActions } from '../../state/reducers/office-modal-reducer';
import { officeActions } from '../../state/reducers/office-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';
import CustomSelector from '../components/custom-selector';
import CustomTextBox from '../components/custom-textbox';
import ManageOfficePositionsTable from './manage-office-positions-table';
import Modal from './modal';
import EmployeeSearchable from './searchables/employee-searchable';

export default function ManageOffice() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const officeModalState = useSelector((state: RootState) => state.officeModal);
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );
  useEffect(
    () => {
      getDes();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(officeModalActions.setShowModal(false));
    if (hasChange) dispatch(officeActions.setInitiateSearch(true));
  }
  async function getDes() {
    setBusy(true);
    await getPositions()
      .then((res) => {
        if (res) {
          dispatch(officeModalActions.setPositions(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (officeModalState.office.id > 0) {
      await updateOffice(
        officeModalState.office,
        officeModalState.newPosition,
        officeModalState.deletedPosition
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Office has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertOffice(officeModalState.office, officeModalState.newPosition)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New office has been added.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  function onCloseEmployeeSearch(employee?: Employee) {
    if (employee) {
      dispatch(officeModalActions.updateHead(employee));
    }
  }
  return (
    <Modal
      className='office-modal'
      onClose={() => onModalClose(false)}
      title='Manage Office'>
      <div className='modal-content-body'>
        <CustomSelector
          title='Head'
          value={officeModalState.office?.departmentHead?.fullName}
          onSelectorClick={() => {
            dispatch(
              employeeSearchableActions.setOnCloseFunction(
                onCloseEmployeeSearch
              )
            );
            dispatch(employeeSearchableActions.setShowModal(true));
          }}
        />
        <CustomTextBox
          title='Description'
          name='description'
          value={officeModalState.office?.description}
          onChange={(ret) => {
            dispatch(officeModalActions.updateOffice(ret));
          }}
        />
        <CustomTextBox
          title='Abbreviation'
          name='abbreviation'
          value={officeModalState.office?.abbreviation}
          onChange={(ret) => {
            dispatch(officeModalActions.updateOffice(ret));
          }}
        />
        <ManageOfficePositionsTable />
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save</span>
          </button>
        </div>
      </div>

      <>{employeeSearchableState.isModalShow && <EmployeeSearchable />}</>
    </Modal>
  );
}
