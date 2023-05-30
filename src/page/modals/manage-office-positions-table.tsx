import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { officeModalActions } from '../../state/reducers/office-modal-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';

export default function ManageEmployeeEligibilitiesTable() {
  const dispatch = useDispatch();
  const officeModalState = useSelector((state: RootState) => state.officeModal);
  return (
    <>
      <CustomDropdown
        selectorOnly={true}
        title='Position'
        onChange={(ret) => {
          dispatch(officeModalActions.addNewPosition(ret.value));
        }}
        itemsList={officeModalState.positions.map((x) => {
          return {
            key: x.id.toString(),
            value: x.description,
          };
        })}
      />
      <div className='table-container office-management-table'>
        <table className='item-table'>
          <thead>
            <tr>
              <th>Positions</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {officeModalState.officePositions?.map((officePositions) => (
              <tr
                key={officePositions.tempId}
                className={officePositions.deleted ? 'deleted' : ''}>
                <td>{officePositions.position?.description}</td>
                <td className='table-actions'>
                  {officePositions.deleted && (
                    <FontAwesomeIcon
                      icon={faUndo}
                      className='action-icon table-icon-button'
                      onClick={() => {
                        dispatch(
                          officeModalActions.undoDeletePosition(
                            officePositions.id
                          )
                        );
                      }}
                      title='Undo'
                    />
                  )}
                  {!officePositions.deleted && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className='action-icon table-icon-button'
                      onClick={() => {
                        dispatch(
                          officeModalActions.deletePosition(officePositions)
                        );
                      }}
                      title='Delete'
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
