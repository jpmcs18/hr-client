import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { LeaveRequestTypeDefaults } from '../../../constant';
import { leaveApplicationActions } from '../../../state/reducers/leave-application-reducer';
import { RootState } from '../../../state/store';
import CustomCheckBox from '../../components/custom-checkbox';
import CustomCheckBoxButton from '../../components/custom-checkbox-button';
import CustomDateTimePicker from '../../components/custom-datetime-picker';
import CustomNumber from '../../components/custom-number';
import CustomTextBox from '../../components/custom-textbox';

export default function SecondStep() {
  const leaveApplicationState = useSelector(
    (state: RootState) => state.leaveApplication
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className='modal-content-body leave-application-content-body'>
        <div className='leave-details-container'>
          <div className='leave-days'>
            {leaveApplicationState.hasLeaveCredits && (
              <CustomNumber
                type='number'
                title='Available Leave Credits'
                readonly={true}
                value={leaveApplicationState.availableLeaveCredits}
              />
            )}
            <CustomCheckBoxButton
              name='isMultipleDays'
              CheckedTitle='Multiple Day'
              UncheckedTitle='Single Day'
              isCheck={!!leaveApplicationState.leaveRequest.isMultipleDays}
              onChange={(ret) => {
                dispatch(leaveApplicationActions.updateLeaveRequest(ret));
              }}
            />
            {!leaveApplicationState.leaveRequest.isMultipleDays ? (
              <>
                <CustomDateTimePicker
                  title='Inclusive Dates'
                  type='date'
                  name='startDate'
                  value={leaveApplicationState.leaveRequest.startDate}
                  onChange={(ret) => {
                    dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                  }}
                />
              </>
            ) : (
              <>
                <CustomDateTimePicker
                  title='Start Date'
                  type='date'
                  name='startDate'
                  value={leaveApplicationState.leaveRequest.startDate}
                  onChange={(ret) => {
                    dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                  }}
                />
                <CustomDateTimePicker
                  title='End Date'
                  type='date'
                  name='endDate'
                  value={leaveApplicationState.leaveRequest.endDate}
                  onChange={(ret) => {
                    dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                  }}
                />
                <CustomNumber
                  title='Total Days'
                  type='number'
                  name='totalLeaveCredits'
                  value={leaveApplicationState.leaveRequest.totalLeaveCredits}
                  onChange={(ret) => {
                    dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                  }}
                />
              </>
            )}
          </div>
          <div className='leave-details'>
            {(+(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
              +LeaveRequestTypeDefaults.VacationLeave ||
              +(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
                +LeaveRequestTypeDefaults.SpecialPriviledgeLeave) && (
              <div className='details-group'>
                <CustomCheckBox
                  text='Within the Philippines'
                  id='local'
                  onChange={(ret) => {
                    if (!leaveApplicationState.leaveRequest.isLocal) {
                      dispatch(
                        leaveApplicationActions.updateLeaveRequest({
                          elementName: 'location',
                          value: undefined,
                        })
                      );
                    }
                    dispatch(
                      leaveApplicationActions.updateLeaveRequest({
                        elementName: 'isLocal',
                        value: true,
                      })
                    );
                  }}
                  isChecked={!!leaveApplicationState.leaveRequest.isLocal}
                />
                <CustomTextBox
                  title='Specify'
                  name='location'
                  value={
                    !leaveApplicationState.leaveRequest.isLocal
                      ? ''
                      : leaveApplicationState.leaveRequest.location
                  }
                  onChange={(ret) => {
                    if (!!leaveApplicationState.leaveRequest.isLocal) {
                      dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                    }
                  }}
                />
                <CustomCheckBox
                  text='Abroad'
                  id='abroad'
                  onChange={(ret) => {
                    if (!!leaveApplicationState.leaveRequest.isLocal) {
                      dispatch(
                        leaveApplicationActions.updateLeaveRequest({
                          elementName: 'location',
                          value: undefined,
                        })
                      );
                    }
                    dispatch(
                      leaveApplicationActions.updateLeaveRequest({
                        elementName: 'isLocal',
                        value: false,
                      })
                    );
                  }}
                  isChecked={!leaveApplicationState.leaveRequest.isLocal}
                />
                <CustomTextBox
                  title='Specify'
                  name='location'
                  value={
                    !!leaveApplicationState.leaveRequest.isLocal
                      ? ''
                      : leaveApplicationState.leaveRequest.location
                  }
                  onChange={(ret) => {
                    if (!leaveApplicationState.leaveRequest.isLocal) {
                      dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                    }
                  }}
                />
              </div>
            )}
            {+(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
              +LeaveRequestTypeDefaults.SickLeave && (
              <div className='details-group'>
                <CustomCheckBox
                  text='In Hospital'
                  id='inHospital'
                  onChange={(ret) => {
                    if (!leaveApplicationState.leaveRequest.isAdmitted) {
                      dispatch(
                        leaveApplicationActions.updateLeaveRequest({
                          elementName: 'illness',
                          value: undefined,
                        })
                      );
                    }
                    dispatch(
                      leaveApplicationActions.updateLeaveRequest({
                        elementName: 'isAdmitted',
                        value: true,
                      })
                    );
                  }}
                  isChecked={!!leaveApplicationState.leaveRequest.isAdmitted}
                />
                <CustomTextBox
                  title='Specify Illness'
                  name='illness'
                  value={
                    !leaveApplicationState.leaveRequest.isAdmitted
                      ? ''
                      : leaveApplicationState.leaveRequest.illness
                  }
                  onChange={(ret) => {
                    dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                  }}
                />
                <CustomCheckBox
                  text='Out Patient'
                  id='outpatient'
                  onChange={(ret) => {
                    if (!!leaveApplicationState.leaveRequest.isAdmitted) {
                      dispatch(
                        leaveApplicationActions.updateLeaveRequest({
                          elementName: 'illness',
                          value: undefined,
                        })
                      );
                    }
                    dispatch(
                      leaveApplicationActions.updateLeaveRequest({
                        elementName: 'isAdmitted',
                        value: false,
                      })
                    );
                  }}
                  isChecked={!leaveApplicationState.leaveRequest.isAdmitted}
                />
                <CustomTextBox
                  title='Specify Illness'
                  name='illness'
                  value={
                    !!leaveApplicationState.leaveRequest.isAdmitted
                      ? ''
                      : leaveApplicationState.leaveRequest.illness
                  }
                  onChange={(ret) => {
                    dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                  }}
                />
              </div>
            )}
            {+(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
              +LeaveRequestTypeDefaults.SpecialLeaveBenefitforWomen && (
              <div className='details-group'>
                <CustomTextBox
                  title='Specify Illness'
                  name='slbwIllness'
                  value={leaveApplicationState.leaveRequest.slbwIllness}
                  onChange={(ret) => {
                    dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                  }}
                />
              </div>
            )}
            {+(leaveApplicationState.leaveRequest.leaveRequestTypeId ?? 0) ===
              +LeaveRequestTypeDefaults.StudyLeave && (
              <div className='details-group'>
                <CustomCheckBox
                  text="Completion of Master's Degree"
                  name='completionOfMatersDegree'
                  id='completionOfMatersDegree'
                  onChange={(ret) => {
                    dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                    dispatch(
                      leaveApplicationActions.updateLeaveRequest({
                        elementName: 'bar',
                        value: undefined,
                      })
                    );
                  }}
                  isChecked={
                    !!leaveApplicationState.leaveRequest
                      .completionOfMatersDegree
                  }
                />
                <CustomCheckBox
                  text='BAR/Board Examination Review'
                  name='bar'
                  id='bar'
                  onChange={(ret) => {
                    dispatch(leaveApplicationActions.updateLeaveRequest(ret));
                    dispatch(
                      leaveApplicationActions.updateLeaveRequest({
                        elementName: 'completionOfMatersDegree',
                        value: undefined,
                      })
                    );
                  }}
                  isChecked={!!leaveApplicationState.leaveRequest.bar}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button
            onClick={() => dispatch(leaveApplicationActions.setCurrentStep(1))}
            className='btn-action'>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className='desktop-features'>Back</span>
          </button>
          <button
            onClick={() => dispatch(leaveApplicationActions.setCurrentStep(3))}
            className='btn-action'
            disabled={!leaveApplicationState.continueToStep3}>
            <FontAwesomeIcon icon={faChevronRight} />
            <span className='desktop-features'>Continue</span>
          </button>
        </div>
      </div>
    </>
  );
}
