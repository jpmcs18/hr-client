import { useDispatch, useSelector } from 'react-redux';
import { positionActions } from '../../../state/reducers/position-reducer';
import { RootState } from '../../../state/store';
import PositionItem from './position-item';

export default function PositionItems() {
  const dispatch = useDispatch();
  const positionState = useSelector((state: RootState) => state.position);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {positionState.positions.map((position) => (
            <tr
              onClick={() => dispatch(positionActions.setSelected(position))}
              key={position.id}
              className={
                positionState.selectedPosition?.id === position.id
                  ? 'selected'
                  : ''
              }>
              <PositionItem position={position} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
