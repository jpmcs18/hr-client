import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import CustomDropdown from '../custom-dropdown';
import SearchBar from '../searchbar';

export default function EmployeeSearch() {
  const employeeState = useSelector((state: RootState) => state.employee);
  const dispatch = useDispatch();
  async function search(key: string) {
    dispatch(employeeActions.setkey(key));
    dispatch(employeeActions.setCurrentPage(1));
    dispatch(employeeActions.setInitiateSearch(true));
  }
  return (
    <>
      <div className='search-filter-container'>
        <CustomDropdown
          title='Office'
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
        <CustomDropdown
          title='Position'
          value={employeeState.selectedPositionId}
          onChange={(res) =>
            dispatch(employeeActions.setSelectedPosition(res.value))
          }
          itemsList={employeeState.positions.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDropdown
          title='Gender'
          value={employeeState.selectedGenderId}
          onChange={(res) =>
            dispatch(employeeActions.setSelectedGender(res.value))
          }
          itemsList={employeeState.genders.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
      </div>
      <section>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={employeeState.key}
        />
      </section>
    </>
  );
}
