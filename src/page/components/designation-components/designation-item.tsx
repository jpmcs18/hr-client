import Designation from '../../../entities/Designation';

export default function DesignationItem({
  designation,
}: {
  designation: Designation;
}) {
  return (
    <>
      <td>{designation.description}</td>
    </>
  );
}
