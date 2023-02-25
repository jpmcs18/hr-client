import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import {
  insertDesignation,
  updateDesignation,
} from '../../repositories/designation-queries';
import { designationModalActions } from '../../state/reducers/designation-modal-reducer';
import { designationActions } from '../../state/reducers/designation-reducer';
import { RootState } from '../../state/store';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManageDesignation() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const designationModalState = useSelector(
    (state: RootState) => state.designationModal
  );
  function onModalClose(hasChange: boolean) {
    dispatch(designationModalActions.setShowModal(false));
    if (hasChange) dispatch(designationActions.setInitiateSearch(true));
  }
  async function saveData() {
    setBusy(true);
    if (designationModalState.designation.id > 0) {
      await updateDesignation(designationModalState.designation)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Designation has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertDesignation(designationModalState.designation)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New designation has been added.' });
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
      className='designation-modal'
      onClose={() => onModalClose(false)}
      title='Manage Designation'>
      <div className='modal-content-body'>
        <CustomTextBox
          title='Description'
          value={designationModalState.designation?.description}
          onChange={(ret) => {
            dispatch(
              designationModalActions.setDesignation({
                ...designationModalState.designation!,
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
