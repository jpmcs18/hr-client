import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'guid-typescript';
import Employee from '../../models/entities/Employee';
import EmployeeAttachment from '../../models/entities/EmployeeAttachment';

interface FileUploading {
  id: number;
  tempId: string;
  file: File;
  isUploading: boolean;
  uploaded: boolean;
  url: string;
  isImage: boolean;
  isDeleted: boolean;
}
interface State {
  employee: Employee | undefined;
  deletedEmployeeAttachmentIds: number[];
  files: FileUploading[];
  isModalShow: boolean;
  initiateUpload: boolean;
}

const initialState: State = {
  employee: undefined,
  deletedEmployeeAttachmentIds: [],
  files: [],
  isModalShow: false,
  initiateUpload: false,
};

const employeeAttachmentModalSlice = createSlice({
  name: 'employee-attachment-modal',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload;
      state.deletedEmployeeAttachmentIds = [];
      state.files = [];
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    deleteAttachment(state, action: PayloadAction<string>) {
      state.files = state.files.slice().map((file) => {
        if (file.tempId === action.payload) {
          file.isDeleted = true;
        }
        return file;
      });
    },
    undoDeleteAttachment(state, action: PayloadAction<string>) {
      state.files = state.files.slice().map((file) => {
        if (file.tempId === action.payload) {
          file.isDeleted = false;
        }
        return file;
      });
    },
    setUploadedFiles(state, action: PayloadAction<FileList>) {
      const fileTypes = ['jpeg', 'jpg', 'png'];
      state.files.push(
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
            isUploading: false,
            uploaded: false,
            url: isImage ? URL.createObjectURL(file) : '',
            isImage: isImage,
            isDeleted: false,
          };
        })
      );
      state.initiateUpload = true;
    },
    updateUploadingFiles(state, action: PayloadAction<string[]>) {
      state.files = state.files.slice().map((file) => {
        if (!!action.payload.filter((x) => x === file.tempId).length) {
          file.isUploading = true;
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
          file.isUploading = false;
          file.uploaded = true;
          file.id = action.payload.attachment.id;
          file.url = action.payload.attachment.fileUrl ?? file.url;
        }
        return file;
      });
    },
    setIntiateUpload(state, action: PayloadAction<boolean>) {
      state.initiateUpload = action.payload;
    },
  },
});

export default employeeAttachmentModalSlice.reducer;
export const employeeAttachmentModalActions =
  employeeAttachmentModalSlice.actions;
