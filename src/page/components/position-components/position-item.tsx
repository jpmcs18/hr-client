import Position from '../../../models/entities/Position';

export default function PositionItem({ position }: { position: Position }) {
  return (
    <>
      <td>{position.description}</td>
    </>
  );
}
