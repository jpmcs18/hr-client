import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { officeModalActions } from '../../state/reducers/office-modal-reducer';
import { RootState } from '../../state/store';

export default function ManageOfficeDesignationsTable() {
  const dispatch = useDispatch();
  const officeModalState = useSelector((state: RootState) => state.officeModal);
  return (
    <div className='table-container office-management-table'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Designations</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {officeModalState.officeDesignations?.map((officeDesignations) => (
            <tr
              key={officeDesignations.tempId}
              className={officeDesignations.deleted ? 'deleted' : ''}>
              <td>{officeDesignations.designation?.description}</td>
              <td className='table-actions'>
                {officeDesignations.deleted && (
                  <FontAwesomeIcon
                    icon={faUndo}
                    className='action-icon table-icon-button'
                    onClick={() => {
                      dispatch(
                        officeModalActions.undoDeleteDesignation(
                          officeDesignations.id
                        )
                      );
                    }}
                    title='Undo'
                  />
                )}
                {!officeDesignations.deleted && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    className='action-icon table-icon-button'
                    onClick={() => {
                      dispatch(
                        officeModalActions.deleteDesignation(officeDesignations)
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
  );
}
