import Office from '../../../entities/Office';

export default function OfficeItem({ office }: { office: Office }) {
  return (
    <>
      <td>{office.description}</td>
      <td>{office.abbreviation}</td>
    </>
  );
}
