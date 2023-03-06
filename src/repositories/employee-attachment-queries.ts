import { EmployeeAttachmentEnd } from '../endpoints';
import EmployeeAttachment from '../models/entities/EmployeeAttachment';
import { httpPostMultiPart } from './base';

export async function uploadAttachment(
  file: File,
  employeeId: number
): Promise<EmployeeAttachment | undefined> {
  var formData = new FormData();
  formData.append('employeeId', employeeId.toString());
  formData.append('file', file);
  return httpPostMultiPart<EmployeeAttachment>(
    EmployeeAttachmentEnd.Upload,
    formData
  );
}
