import { EmployeeAttachmentEnd } from '../endpoints';
import EmployeeAttachment from '../models/entities/EmployeeAttachment';
import { httpDelete, httpGet, httpPostMultiPart, httpPut } from './base';

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

export async function getAttachments(
  employeeId: number
): Promise<EmployeeAttachment[] | undefined> {
  return httpGet<EmployeeAttachment[]>(
    EmployeeAttachmentEnd.GetList + '/' + employeeId
  );
}

export async function deleteAttachment(employeeId: number): Promise<boolean> {
  return httpDelete(EmployeeAttachmentEnd.Delete + '/' + employeeId);
}

export async function undoDeleteAttachment(
  employeeId: number
): Promise<boolean> {
  return httpPut(EmployeeAttachmentEnd.UndoDelete + '/' + employeeId);
}
