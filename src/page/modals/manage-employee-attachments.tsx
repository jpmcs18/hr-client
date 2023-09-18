import {
  faDownload,
  faExclamationCircle,
  faMaximize,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCatchClause } from 'typescript';
import { Pages } from '../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { downloadFile, hasAccess, validateFileSize } from '../../helper';
import {
  deleteAttachment,
  getAttachments,
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
      try {
        validateFileSize(file.file);
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
      } catch (err: any) {
        dispatch(
          employeeAttachmentModalActions.setErrorFile({
            tempId: file.tempId!,
            errorMessage: err.message,
          })
        );
      }
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
  function openNewTab(fileUrl?: string) {
    window.open(fileUrl, '_blank');
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
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Attachment,
          'Add',
          userProfileState.systemUser?.isAdmin
        ) && (
          <div
            className='attachment attachment-add'
            onClick={showFileBrowser}></div>
        )}
        {employeeAttachmentModalState.files.map((file) => (
          <div key={file.tempId} className='attachment'>
            {file.isProcessing && <CustomLoading />}
            {!file.isProcessing && (
              <div className='attachment-control btn-actions-group'>
                {hasAccess(
                  userProfileState.moduleRights,
                  Pages.Attachment,
                  'Maximize (Print & Download)',
                  userProfileState.systemUser?.isAdmin
                ) &&
                  !file.isError &&
                  file.showPreview && (
                    <button
                      className='btn-action'
                      title='Maximize (Print & Download)'
                      onClick={() => openNewTab(file.fileUrl)}>
                      <FontAwesomeIcon icon={faMaximize} />
                    </button>
                  )}
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

            {file.isError ? (
              <div className='error-message'>
                <div className='file'>{file.file?.name}</div>
                <div className='error'>
                  <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                  {file.errorMessage}
                </div>
              </div>
            ) : !file.showPreview ? (
              <>
                <a
                  href={file.url}
                  download='Example-PDF-document'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <button className='btn-tool download-file'>
                    <div className='file-name'>
                      <p>{file.fileName}</p>
                    </div>
                    <div className='download'>
                      <FontAwesomeIcon icon={faDownload} />
                      <span className='desktop-features'>Download</span>
                    </div>
                  </button>
                </a>
              </>
            ) : (
              <>
                {file.isImage ? (
                  <img src={file.url} alt={file.fileName} />
                ) : (
                  <iframe title={file.url} src={file.url} />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}
