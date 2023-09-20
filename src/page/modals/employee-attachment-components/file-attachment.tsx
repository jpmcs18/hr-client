import React from 'react';
import { Link } from 'react-router-dom';
import { FileUploading } from '../../../state/reducers/employee-attachment-modal-reducer';

export default function FileAttachment({
  file,
  allowView,
}: {
  file: FileUploading;
  allowView: boolean;
}) {
  function openNewTab() {
    if (allowView) {
      window.open(file.fileUrl, '_blank');
    }
  }
  return (
    <div className='file-attachment'>
      <button className='btn-tool' onClick={openNewTab}>
        <p className='file-name'>{file.fileName}</p>
      </button>
      <p className='subtitle'>{file.fileSize}</p>
    </div>
  );
}
