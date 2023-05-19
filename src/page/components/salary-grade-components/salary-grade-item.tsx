import { toDate } from '../../../helper';
import SalaryGradeBatch from '../../../models/entities/SalaryGradeBatch';

export default function PositionItem({
  salaryGradeBatch,
}: {
  salaryGradeBatch: SalaryGradeBatch;
}) {
  return (
    <>
      <td>{salaryGradeBatch.description}</td>
      <td>{toDate(salaryGradeBatch.validityDate)}</td>
      <td>{toDate(salaryGradeBatch.expiryDate)}</td>
    </>
  );
}
