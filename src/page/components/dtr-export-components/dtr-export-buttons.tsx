import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import { hasAccess } from '../../../helper';
import { dtrExportActions } from '../../../state/reducers/dtr-export-reducer';
import { RootState } from '../../../state/store';
import CustomDropdown from '../custom-dropdown';

export default function DTRExportButtons() {
  const dtrExportState = useSelector((state: RootState) => state.dtrExport);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  return (
    <>
      {hasAccess(
        userProfileState.moduleRights,
        Pages.DTRExport,
        'Report Export',
        userProfileState.systemUser?.isAdmin
      ) && (
        <div className='dtr-export-buttons'>
          <CustomDropdown
            title='Export Options'
            value={dtrExportState.selectedOption}
            onChange={(ret) =>
              dispatch(dtrExportActions.setSelectedOption(ret.value))
            }
            selectorOnly={true}
            itemsList={[
              {
                key: '1',
                value: 'All',
              },
              {
                key: '2',
                value: 'Selected Employee',
              },
              {
                key: '3',
                value: 'Selected Office',
              },
            ]}
          />
          <CustomDropdown
            title='File Segregation'
            value={dtrExportState.selectedSegregation}
            onChange={(ret) =>
              dispatch(dtrExportActions.setSelectedSegregation(ret.value))
            }
            selectorOnly={true}
            itemsList={[
              {
                key: '1',
                value: 'One File',
              },
              {
                key: '2',
                value: 'Per Employee',
              },
              {
                key: '3',
                value: 'Per Office',
              },
            ]}
          />
          <div className='btn-actions-group'>
            <button className='btn-action'>
              <FontAwesomeIcon icon={faFileExport} />
              <span className='desktop-features'>Export</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
