import {
  faExclamationCircle,
  faFileUpload,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import {
  deleteAttachment,
  getAttachments,
  uploadAttachment,
} from '../../../repositories/employee-attachment-queries';
import {
  FileUploading,
  employeeAttachmentModalActions,
} from '../../../state/reducers/employee-attachment-modal-reducer';
import { RootState } from '../../../state/store';
import CustomLoading from '../../components/custom-loading';
import Modal from '../modal';
import FileAttachment from './file-attachment';

export default function ManageEmployeeAttachments() {
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const fileRef = useRef<HTMLInputElement>(null);
  const setBusy = useSetBusy();
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const employeeAttachmentModalState = useSelector(
    (state: RootState) => state.employeeAttachmentModal
  );
  useEffect(
    () => {
      if (employeeAttachmentModalState.initiateUpload) upload();
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
        employeeAttachmentModalActions.setUploadedFiles(fileRef.current.files!)
      );

      fileRef.current.value = '';
    }
  }
  async function deletion(file: FileUploading) {
    if (file.isError) {
      dispatch(employeeAttachmentModalActions.deleteAttachment(file.tempId));
    } else {
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
        {employeeAttachmentModalState.files.map((file) => (
          <div key={file.tempId} className='attachment'>
            {file.isProcessing && <CustomLoading />}

            {file.isError ? (
              <div className='error-message'>
                <div className='file'>{file.file?.name}</div>
                <div className='error'>
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {file.errorMessage}
                </div>
              </div>
            ) : (
              <FileAttachment
                file={file!}
                allowView={
                  !!hasAccess(
                    userProfileState.moduleRights,
                    Pages.Attachment,
                    'Maximize (Print & Download)',
                    userProfileState.systemUser?.isAdmin
                  )
                }
              />
            )}
            {!file.isProcessing && (
              <div className='attachment-control btn-actions-group'>
                {hasAccess(
                  userProfileState.moduleRights,
                  Pages.Attachment,
                  'Delete',
                  userProfileState.systemUser?.isAdmin
                ) && (
                  <button
                    className='btn-action'
                    title='Delete'
                    onClick={() => deletion(file)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {hasAccess(
        userProfileState.moduleRights,
        Pages.Attachment,
        'Add',
        userProfileState.systemUser?.isAdmin
      ) && (
        <div className='modal-footer'>
          <div className='btn-actions-group'>
            <button className='btn-action' onClick={showFileBrowser}>
              <FontAwesomeIcon icon={faFileUpload} />
              <span className='desktop-features'>Upload File</span>
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}