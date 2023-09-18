export default interface EmployeeAttachment {
  id: number;
  employeeId: number | undefined;
  fileName: string | undefined;
  fileUrl: string | undefined;
  showPreview: boolean | undefined;
}
