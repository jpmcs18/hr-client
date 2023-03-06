import { faFile, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAttachment } from '../../repositories/employee-attachment-queries';
import { employeeAttachmentModalActions } from '../../state/reducers/employee-attachment-modal-reducer';
import { officeActions } from '../../state/reducers/office-reducer';
import { RootState } from '../../state/store';
import CustomLoading from '../components/custom-loading';
import Modal from './modal';

export default function ManageEmployeeAttachments() {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
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

  function onModalClose() {
    dispatch(employeeAttachmentModalActions.setShowModal(false));
  }

  function showFileBrowser() {
    fileRef.current?.click();
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
      uploadAttachment(
        file.file,
        employeeAttachmentModalState.employee!.id
      ).then((res) => {
        if (res) {
          dispatch(
            employeeAttachmentModalActions.updateUploadedFiles({
              tempId: file.tempId,
              attachment: res,
            })
          );
        }
      });
    });
  }
  async function onSelectCapture() {
    if (!!fileRef.current?.files?.length) {
      dispatch(
        employeeAttachmentModalActions.setUploadedFiles(fileRef.current?.files!)
      );
    }
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
        accept='image/png, image/jpeg, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
            {file.isUploading && <CustomLoading />}
            {!file.isUploading && (
              <div className='attachment-control btn-actions-group'>
                {!file.isDeleted && (
                  <button
                    className='btn-action'
                    title='Delete'
                    onClick={() =>
                      dispatch(
                        employeeAttachmentModalActions.deleteAttachment(
                          file.tempId
                        )
                      )
                    }>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
                {file.isDeleted && (
                  <button
                    className='btn-action'
                    title='Undo Delete'
                    onClick={() =>
                      dispatch(
                        employeeAttachmentModalActions.undoDeleteAttachment(
                          file.tempId
                        )
                      )
                    }>
                    <FontAwesomeIcon icon={faUndo} />
                  </button>
                )}
              </div>
            )}
            {file.isImage ? (
              <img src={file.url} alt={file.file.name} />
            ) : (
              <div className='documents'>
                <FontAwesomeIcon className='icon' icon={faFile} />
                <p>
                  File Name: <span className='file-name'>{file.file.name}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}
