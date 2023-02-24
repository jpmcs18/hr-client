import Office from '../../../models/entities/Office';

export default function OfficeItem({ office }: { office: Office }) {
  return (
    <>
      <td>{office.description}</td>
      <td>{office.abbreviation}</td>
    </>
  );
}
