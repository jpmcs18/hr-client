import { useDispatch, useSelector } from 'react-redux';
import { designationActions } from '../../../state/reducers/designation-reducer';
import { RootState } from '../../../state/store';
import DesignationItem from './designation-item';

export default function DesignationItems() {
  const dispatch = useDispatch();
  const designationState = useSelector((state: RootState) => state.designation);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {designationState.designations.map((designation) => (
            <tr
              onClick={() =>
                dispatch(designationActions.setSelected(designation))
              }
              key={designation.id}
              className={
                designationState.selectedDesignation?.id === designation.id
                  ? 'selected'
                  : ''
              }>
              <DesignationItem designation={designation} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
