import { faFile, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import {
  deleteAttachment,
  getAttachments,
  undoDeleteAttachment,
  uploadAttachment,
} from '../../repositories/employee-attachment-queries';
import {
  employeeAttachmentModalActions,
  FileUploading,
} from '../../state/reducers/employee-attachment-modal-reducer';
import { RootState } from '../../state/store';
import CustomLoading from '../components/custom-loading';
import Modal from './modal';

export default function ManageEmployeeAttachments() {
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const fileRef = useRef<HTMLInputElement>(null);
  const setBusy = useSetBusy();
  const employeeAttachmentModalState = useSelector(
    (state: RootState) => state.employeeAttachmentModal
  );
  useEffect(
    () => {
      upload();
    },
    //eslint-disable-next-line
    [employeeAttachmentModalState.initiateUpload]
  );
  useEffect(
    () => {
      getAtt();
    },
    //eslint-disable-next-line
    [employeeAttachmentModalState.initiateSearch]
  );

  function onModalClose() {
    dispatch(employeeAttachmentModalActions.setShowModal(false));
  }

  function showFileBrowser() {
    fileRef.current?.click();
  }

  async function getAtt() {
    if (!employeeAttachmentModalState.initiateSearch) return;
    setBusy(true);
    dispatch(employeeAttachmentModalActions.setInitiateSearch(false));
    await getAttachments(employeeAttachmentModalState.employee?.id!)
      .then((res) => {
        if (res !== undefined) {
          dispatch(employeeAttachmentModalActions.fill(res));
        }
      })
      .finally(() => {
        setBusy(false);
      });
  }

  async function upload() {
    dispatch(employeeAttachmentModalActions.setIntiateUpload(false));
    var toUpload = employeeAttachmentModalState.files
      .slice()
      .filter((x) => !x.uploaded);

    dispatch(
      employeeAttachmentModalActions.updateUploadingFiles(
        toUpload.map((x) => x.tempId)
      )
    );
    toUpload.forEach((file) => {
      uploadAttachment(file.file!, employeeAttachmentModalState.employee!.id)
        .then((res) => {
          if (res) {
            dispatch(
              employeeAttachmentModalActions.updateUploadedFiles({
                tempId: file.tempId,
                attachment: res,
              })
            );
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    });
  }
  async function onSelectCapture() {
    if (!!fileRef.current?.files?.length) {
      dispatch(
        employeeAttachmentModalActions.setUploadedFiles(fileRef.current?.files!)
      );
    }
  }
  async function deletion(file: FileUploading) {
    dispatch(
      employeeAttachmentModalActions.updateProcessingFile({
        tempId: file.tempId,
        isProcessing: true,
      })
    );
    await deleteAttachment(file.id)
      .then((res) => {
        if (res) {
          dispatch(
            employeeAttachmentModalActions.deleteAttachment(file.tempId)
          );
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => {
        dispatch(
          employeeAttachmentModalActions.updateProcessingFile({
            tempId: file.tempId,
            isProcessing: false,
          })
        );
      });
  }
  async function undoDeletion(file: FileUploading) {
    dispatch(
      employeeAttachmentModalActions.updateProcessingFile({
        tempId: file.tempId,
        isProcessing: true,
      })
    );
    await undoDeleteAttachment(file.id)
      .then((res) => {
        if (res) {
          dispatch(
            employeeAttachmentModalActions.undoDeleteAttachment(file.tempId)
          );
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => {
        dispatch(
          employeeAttachmentModalActions.updateProcessingFile({
            tempId: file.tempId,
            isProcessing: false,
          })
        );
      });
  }
  return (
    <Modal
      className='employee-attachment-modal'
      onClose={onModalClose}
      title='Manage Employee Attachments'>
      <input
        style={{ display: 'none' }}
        type='file'
        multiple
        ref={fileRef}
        onChange={onSelectCapture}
        accept='image/png, image/jpeg, application/pdf'
      />
      <div className='employee-attachment-content-body'>
        <div
          className='attachment attachment-add'
          onClick={showFileBrowser}></div>
        {employeeAttachmentModalState.files.map((file) => (
          <div
            key={file.tempId}
            className={
              'attachment ' + (file.isDeleted ? 'attachment-deleted' : '')
            }>
            {file.isProcessing && <CustomLoading />}
            {!file.isProcessing && (
              <div className='attachment-control btn-actions-group'>
                {!file.isDeleted && (
                  <button
                    className='btn-action'
                    title='Delete'
                    onClick={() => deletion(file)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
                {file.isDeleted && (
                  <button
                    className='btn-action'
                    title='Undo Delete'
                    onClick={() => undoDeletion(file)}>
                    <FontAwesomeIcon icon={faUndo} />
                  </button>
                )}
              </div>
            )}
            {file.isImage ? (
              <img src={file.url} alt={file.fileName} />
            ) : (
              <iframe src={file.url} />
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}
