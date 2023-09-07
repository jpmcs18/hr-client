import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'guid-typescript';
import Employee from '../../models/entities/Employee';
import EmployeeAttachment from '../../models/entities/EmployeeAttachment';

export interface FileUploading {
  id: number;
  tempId: string;
  file?: File;
  isProcessing: boolean;
  uploaded: boolean;
  fileUrl?: string;
  fileName: string;
  url: string;
  isImage: boolean;
}
interface State {
  employee: Employee | undefined;
  deletedEmployeeAttachmentIds: number[];
  files: FileUploading[];
  isModalShow: boolean;
  initiateUpload: boolean;
  initiateSearch: boolean;
}

const initialState: State = {
  employee: undefined,
  deletedEmployeeAttachmentIds: [],
  files: [],
  isModalShow: false,
  initiateUpload: false,
  initiateSearch: false,
};

const employeeAttachmentModalSlice = createSlice({
  name: 'employee-attachment-modal',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<EmployeeAttachment[]>) {
      const fileTypes = ['jpeg', 'jpg', 'png'];
      state.files = [];
      state.files.push(
        ...action.payload.map<FileUploading>((attachments) => {
          let fileType = attachments.fileName!.substring(
            attachments.fileName!.lastIndexOf('.') + 1,
            attachments.fileName!.length
          );
          let isImage = !!fileTypes.filter((x) => x === fileType).length;
          return {
            id: attachments.id,
            tempId: Guid.create().toString(),
            isProcessing: false,
            uploaded: true,
            url: attachments.fileUrl!,
            isImage: isImage,
            fileName: attachments.fileName!,
            fileUrl: attachments.fileUrl,
            isDeleted: false,
          };
        })
      );
    },
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload;
      state.deletedEmployeeAttachmentIds = [];
      state.files = [];
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    deleteAttachment(state, action: PayloadAction<string>) {
      state.files = state.files
        .slice()
        .filter((file) => file.tempId !== action.payload);
    },
    setUploadedFiles(state, action: PayloadAction<FileList>) {
      const fileTypes = ['jpeg', 'jpg', 'png'];
      state.files = [
        ...Array.from(action.payload).map<FileUploading>((file) => {
          let fileType = file.name.substring(
            file.name.lastIndexOf('.') + 1,
            file.name.length
          );
          let isImage = !!fileTypes.filter((x) => x === fileType).length;
          return {
            id: 0,
            tempId: Guid.create().toString(),
            file: file,
            isProcessing: false,
            uploaded: false,
            fileName: file.name,
            url: isImage ? URL.createObjectURL(file) : '',
            isImage: isImage,
            isDeleted: false,
          };
        }),
        ...state.files,
      ];
      state.initiateUpload = true;
    },
    updateProcessingFile(
      state,
      action: PayloadAction<{ tempId: string; isProcessing: boolean }>
    ) {
      state.files = state.files.slice().map((file) => {
        if (action.payload.tempId === file.tempId) {
          file.isProcessing = action.payload.isProcessing;
        }
        return file;
      });
    },
    updateUploadingFiles(state, action: PayloadAction<string[]>) {
      state.files = state.files.slice().map((file) => {
        if (!!action.payload.filter((x) => x === file.tempId).length) {
          file.isProcessing = true;
        }
        return file;
      });
    },
    updateUploadedFiles(
      state,
      action: PayloadAction<{ tempId: string; attachment: EmployeeAttachment }>
    ) {
      state.files = state.files.slice().map((file) => {
        if (action.payload.tempId === file.tempId) {
          file.isProcessing = false;
          file.uploaded = true;
          file.id = action.payload.attachment.id;
          file.url = action.payload.attachment.fileUrl!;
          file.fileUrl = action.payload.attachment.fileUrl;
        }
        return file;
      });
    },
    setIntiateUpload(state, action: PayloadAction<boolean>) {
      state.initiateUpload = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
  },
});

export default employeeAttachmentModalSlice.reducer;
export const employeeAttachmentModalActions =
  employeeAttachmentModalSlice.actions;
