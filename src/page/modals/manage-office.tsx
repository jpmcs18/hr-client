import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { insertOffice, updateOffice } from '../../repositories/office-queries';
import { officeModalActions } from '../../state/reducers/office-modal-reducer';
import { RootState } from '../../state/store';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManageOffice({
  onClose,
}: {
  onClose: (hasChanges: boolean) => {};
}) {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const officeModalState = useSelector((state: RootState) => state.officeModal);
  const officeState = useSelector((state: RootState) => state.office);
  function onModalClose(hasChange: boolean) {
    dispatch(officeModalActions.setShowModal(false));
    onClose(hasChange);
  }
  async function saveData() {
    setBusy(true);
    if (officeModalState.office.id > 0) {
      await updateOffice(officeModalState.office)
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
      await insertOffice(officeModalState.office)
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
      </div>
      <div className='modal-footer'>
        <button onClick={saveData} className='btn-modal btn-primary'>
          SAVE
        </button>
      </div>
    </Modal>
  );
}
