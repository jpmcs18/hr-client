import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { leaveRequestActions } from '../../../state/reducers/leave-request-reducer';
import { RootState } from '../../../state/store';
import CustomDateTimePicker from '../custom-datetime-picker';
import CustomDropdown from '../custom-dropdown';
import CustomTextBox from '../custom-textbox';

export default function LeaveRequestSearch() {
  const leaveRequestState = useSelector(
    (state: RootState) => state.leaveRequest
  );
  const dispatch = useDispatch();
  async function search() {
    dispatch(leaveRequestActions.setCurrentPage(1));
    dispatch(leaveRequestActions.setInitiateSearch(true));
  }
  return (
    <>
      <div className='search-main-container'>
        <CustomTextBox
          title='(Employee Name or Reference No)'
          value={leaveRequestState.key}
          onChange={(ret) => dispatch(leaveRequestActions.setkey(ret.value))}
        />
        <CustomDropdown
          title='Request Status'
          value={leaveRequestState.selectedLeaveRequestStatus}
          onChange={(res) =>
            dispatch(
              leaveRequestActions.setSelectedLeaveRequestStatus(res.value)
            )
          }
          itemsList={leaveRequestState.leaveRequestStatuses.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDropdown
          title='Request Type'
          value={leaveRequestState.selectedLeaveRequestType}
          onChange={(res) =>
            dispatch(leaveRequestActions.setSelectedLeaveRequestType(res.value))
          }
          itemsList={leaveRequestState.leaveRequestTypes.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDateTimePicker
          type='date'
          title='Start Date'
          onChange={(res) =>
            dispatch(leaveRequestActions.setStartDate(res.value))
          }
          value={leaveRequestState.startDate}
        />
        <CustomDateTimePicker
          type='date'
          title='End Date'
          onChange={(res) =>
            dispatch(leaveRequestActions.setEndDate(res.value))
          }
          value={leaveRequestState.endDate}
        />
        <FontAwesomeIcon
          icon={faSearch}
          onClick={search}
          className='search-icon'
        />
      </div>
    </>
  );
}
