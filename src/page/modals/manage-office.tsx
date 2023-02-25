import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { getDesignations } from '../../repositories/designation-queries';
import { insertOffice, updateOffice } from '../../repositories/office-queries';
import { officeModalActions } from '../../state/reducers/office-modal-reducer';
import { officeActions } from '../../state/reducers/office-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';
import CustomTextBox from '../components/custom-textbox';
import ManageOfficeDesignationsTable from './manage-system-user-access-table';
import Modal from './modal';

export default function ManageOffice() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const officeModalState = useSelector((state: RootState) => state.officeModal);
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
    await getDesignations()
      .then((res) => {
        if (res) {
          dispatch(officeModalActions.setDesignations(res));
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
        officeModalState.newDesignation,
        officeModalState.deletedDesignation
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
      await insertOffice(
        officeModalState.office,
        officeModalState.newDesignation
      )
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
  return (
    <Modal
      className='office-modal'
      onClose={() => onModalClose(false)}
      title='Manage Office'>
      <div className='modal-content-body'>
        <CustomTextBox
          title='Description'
          value={officeModalState.office?.description}
          onChange={(ret) => {
            dispatch(
              officeModalActions.setOffice({
                ...officeModalState.office!,
                description: ret.value,
              })
            );
          }}
        />
        <CustomTextBox
          title='Abbreviation'
          value={officeModalState.office?.abbreviation}
          onChange={(ret) => {
            dispatch(
              officeModalActions.setOffice({
                ...officeModalState.office!,
                abbreviation: ret.value,
              })
            );
          }}
        />
        <CustomDropdown
          title='Designation'
          hasDefault={true}
          onChange={(ret) => {
            dispatch(officeModalActions.addNewDesignation(ret.value));
          }}
          itemsList={officeModalState.designations.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <ManageOfficeDesignationsTable />
      </div>
      <div className='modal-footer'>
        <button onClick={saveData} className='btn-modal btn-primary'>
          SAVE
        </button>
      </div>
    </Modal>
  );
}
