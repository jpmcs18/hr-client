import SalaryGradeItem from './SalaryGradeItem';

export default interface SalaryGradeBatch {
  id: number;
  validityDate: Date | undefined;
  expiryDate: Date | undefined;
  description: string | undefined;

  salaryGradeItems: SalaryGradeItem[] | undefined;
}
