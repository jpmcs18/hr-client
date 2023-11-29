export default interface SalaryGradeItem {
  id: number;
  salaryGradeBatchId: number | undefined;
  salaryGrade: number;
  step: number;
  amount: number;

  tempId: string | undefined;
}
