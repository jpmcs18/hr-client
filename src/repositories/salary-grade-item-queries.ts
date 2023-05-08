import { SalaryGradeItemEnd } from '../endpoints';
import SalaryGradeItem from '../models/entities/SalaryGradeItem';
import { httpGet } from './base';

export async function getSalaryGradeItem(
  salaryGrade: number,
  step: number
): Promise<SalaryGradeItem | undefined> {
  return httpGet<SalaryGradeItem>(
    SalaryGradeItemEnd.Get + `?salaryGrade=${salaryGrade}&step=${step}`
  );
}
