import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import CustomDropdown from '../custom-dropdown';
import SearchBar from '../searchbar';
import { leaveRequestActions } from '../../../state/reducers/leave-request-reducer';

export default function LeaveRequestSearch() {
  const leaveRequestState = useSelector(
    (state: RootState) => state.leaveRequest
  );
  const dispatch = useDispatch();
  async function search(key: string) {
    dispatch(leaveRequestActions.setkey(key));
    dispatch(leaveRequestActions.setCurrentPage(1));
    dispatch(leaveRequestActions.setInitiateSearch(true));
  }
  return (
    <>
      <div className='search-filter-container'>
        <CustomDropdown
          title='Leave Request Type'
          value={employeeState.selectedOfficeId}
          onChange={(res) =>
            dispatch(employeeActions.setSelectedOffice(res.value))
          }
          itemsList={employeeState.offices.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
      </div>
    </>
  );
}
