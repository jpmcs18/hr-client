import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LeaveRequestTypeDefaults } from '../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import Employee from '../../models/entities/Employee';
import { getEmployeeAvailableLeaveCredits } from '../../repositories/employee-leave-credits-queries';
import {
  insertLeaveRequest,
  updateLeaveRequest,
} from '../../repositories/leave-request-queries';
import { getLeaveRequestTypes } from '../../repositories/leave-request-type-queries';
import { employeeSearchableActions } from '../../state/reducers/employee-searchable-reducer';
import { leaveRequestModalActions } from '../../state/reducers/leave-request-modal-reducer';
import { leaveRequestActions } from '../../state/reducers/leave-request-reducer';
import { RootState } from '../../state/store';
import CustomCheckBox from '../components/custom-checkbox';
import CustomCheckBoxButton from '../components/custom-checkbox-button';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomDropdown from '../components/custom-dropdown';
import CustomNumber from '../components/custom-number';
import CustomSelector from '../components/custom-selector';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';
import EmployeeSearchable from './searchables/employee-searchable';

export default function ManageLeaveRequest() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const leaveRequestModalState = useSelector(
    (state: RootState) => state.leaveRequestModal
  );
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );
  useEffect(
    () => {
      fetchLeaveRequestTypes();
    },
    //eslint-disable-next-line
    []
  );
  useEffect(
    () => {
      getAvailableLeaveCredits();
    },
    //eslint-disable-next-line
    [
      leaveRequestModalState.leaveRequest.employeeId,
      leaveRequestModalState.leaveRequest.leaveRequestTypeId,
    ]
  );
  async function getAvailableLeaveCredits() {
    if (
      !leaveRequestModalState.leaveRequest.employeeId ||
      !leaveRequestModalState.leaveRequest.leaveRequestTypeId
    ) {
      dispatch(leaveRequestModalActions.setAvailableLeaveCredits(undefined));
      return;
    }
    setBusy(true);
    await getEmployeeAvailableLeaveCredits(
      leaveRequestModalState.leaveRequest.employeeId ?? 0,
      leaveRequestModalState.leaveRequest.leaveRequestTypeId ?? 0
    )
      .then((res) => {
        dispatch(leaveRequestModalActions.setAvailableLeaveCredits(res));
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  function onModalClose(hasChange: boolean) {
    dispatch(leaveRequestModalActions.setShowModal(false));
    if (hasChange) dispatch(leaveRequestActions.setInitiateSearch(true));
  }

  async function saveData() {
    setBusy(true);
    if (leaveRequestModalState.leaveRequest.id > 0) {
      await updateLeaveRequest(leaveRequestModalState.leaveRequest)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Leave request updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertLeaveRequest(leaveRequestModalState.leaveRequest)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New leave request added.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }

  async function fetchLeaveRequestTypes() {
    setBusy(true);
    await getLeaveRequestTypes()
      .then((res) => {
        if (res) {
          dispatch(leaveRequestModalActions.setLeaveRequestTypes(res));
        }
      })
      .catch((e) => setToasterMessage({ content: e.message }))
      .finally(() => setBusy(false));
  }
  function setEmployee(employee: Employee | undefined) {
    dispatch(
      leaveRequestModalActions.updateLeaveRequest({
        elementName: 'employeeId',
        value: employee?.id,
      })
    );
    dispatch(
      leaveRequestModalActions.updateLeaveRequest({
        elementName: 'employee',
        value: employee,
      })
    );
  }
  return (
    <Modal
      className='leave-request-modal'
      onClose={() => onModalClose(false)}
      title='Manage Leave Request'>
      <div className='modal-content-body leave-request-body'>
        <div className='main-request'>
          <CustomDateTimePicker
            type='date'
            title='Filing Date'
            name='requestDate'
            value={leaveRequestModalState.leaveRequest.requestDate}
            onChange={(ret) => {
              dispatch(leaveRequestModalActions.updateLeaveRequest(ret));
            }}
          />
          <CustomSelector
            title='Employee'
            value={leaveRequestModalState.leaveRequest.employee?.fullName}
            onSelectorClick={() => {
              dispatch(employeeSearchableActions.setShowModal(true));
              dispatch(
                employeeSearchableActions.setOnCloseFunction(setEmployee)
              );
            }}
            onClear={() => {
              dispatch(
                leaveRequestModalActions.updateLeaveRequest({
                  elementName: 'employeeId',
                  value: undefined,
                })
              );
              dispatch(
                leaveRequestModalActions.updateLeaveRequest({
                  elementName: 'employee',
                  value: undefined,
                })
              );
            }}
          />
          <CustomDropdown
            title='Type'
            name='leaveRequestTypeId'
            value={leaveRequestModalState.leaveRequest.leaveRequestTypeId}
            onChange={(ret) => {
              dispatch(leaveRequestModalActions.updateLeaveRequest(ret));
            }}
            itemsList={leaveRequestModalState.leaveRequestTypes.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description + ` (${x.otherDescription})`,
              };
            })}
          />
          {leaveRequestModalState.hasLeaveCredits && (
            <CustomNumber
              type='number'
              title='Available Leave Credits'
              readonly={true}
              value={leaveRequestModalState.availableLeaveCredits}
            />
          )}
          <CustomCheckBoxButton
            name='isMultipleDays'
            CheckedTitle='Multiple Day'
            UncheckedTitle='Single Day'
            isCheck={!!leaveRequestModalState.leaveRequest.isMultipleDays}
            onChange={(ret) => {
              dispatch(leaveRequestModalActions.updateLeaveRequest(ret));
            }}
          />
          {!leaveRequestModalState.leaveRequest.isMultipleDays ? (
            <>
              <CustomDateTimePicker
                title='Inclusive Dates'
                type='date'
                name='startDate'
                value={leaveRequestModalState.leaveRequest.startDate}
                onChange={(ret) => {
                  dispatch(leaveRequestModalActions.updateLeaveRequest(ret));
                }}
              />
            </>
          ) : (
            <>
              <CustomDateTimePicker
                title='Start Date'
                type='date'
                name='startDate'
                value={leaveRequestModalState.leaveRequest.startDate}
                onChange={(ret) => {
                  dispatch(leaveRequestModalActions.updateLeaveRequest(ret));
                }}
              />
              <CustomDateTimePicker
                title='End Date'
                type='date'
                name='endDate'
                value={leaveRequestModalState.leaveRequest.endDate}
                onChange={(ret) => {
                  dispatch(leaveRequestModalActions.updateLeaveRequest(ret));
                }}
              />
              <CustomNumber
                title='Total Days'
                type='number'
                name='totalLeaveCredits'
                value={leaveRequestModalState.leaveRequest.totalLeaveCredits}
                onChange={(ret) => {
                  dispatch(leaveRequestModalActions.updateLeaveRequest(ret));
                }}
              />
            </>
          )}
        </div>
        <div className='leave-details'>
          <fieldset className='details-container'>
            <legend>DETAILS OF LEAVE</legend>
            <div className='details-content'>
              {(+(
                leaveRequestModalState.leaveRequest.leaveRequestTypeId ?? 0
              ) === +LeaveRequestTypeDefaults.VacationLeave ||
                +(
                  leaveRequestModalState.leaveRequest.leaveRequestTypeId ?? 0
                ) === +LeaveRequestTypeDefaults.SpecialPriviledgeLeave) && (
                <div className='details-group'>
                  <CustomCheckBox
                    text='Within the Philippines'
                    id='local'
                    onChange={(ret) => {
                      if (!leaveRequestModalState.leaveRequest.isLocal) {
                        dispatch(
                          leaveRequestModalActions.updateLeaveRequest({
                            elementName: 'location',
                            value: undefined,
                          })
                        );
                      }
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest({
                          elementName: 'isLocal',
                          value: true,
                        })
                      );
                    }}
                    isChecked={!!leaveRequestModalState.leaveRequest.isLocal}
                  />
                  <CustomTextBox
                    title='Specify'
                    name='location'
                    value={
                      !leaveRequestModalState.leaveRequest.isLocal
                        ? ''
                        : leaveRequestModalState.leaveRequest.location
                    }
                    onChange={(ret) => {
                      if (!!leaveRequestModalState.leaveRequest.isLocal) {
                        dispatch(
                          leaveRequestModalActions.updateLeaveRequest(ret)
                        );
                      }
                    }}
                  />
                  <CustomCheckBox
                    text='Abroad'
                    id='abroad'
                    onChange={(ret) => {
                      if (!!leaveRequestModalState.leaveRequest.isLocal) {
                        dispatch(
                          leaveRequestModalActions.updateLeaveRequest({
                            elementName: 'location',
                            value: undefined,
                          })
                        );
                      }
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest({
                          elementName: 'isLocal',
                          value: false,
                        })
                      );
                    }}
                    isChecked={!leaveRequestModalState.leaveRequest.isLocal}
                  />
                  <CustomTextBox
                    title='Specify'
                    name='location'
                    value={
                      !!leaveRequestModalState.leaveRequest.isLocal
                        ? ''
                        : leaveRequestModalState.leaveRequest.location
                    }
                    onChange={(ret) => {
                      if (!leaveRequestModalState.leaveRequest.isLocal) {
                        dispatch(
                          leaveRequestModalActions.updateLeaveRequest(ret)
                        );
                      }
                    }}
                  />
                </div>
              )}
              {+(
                leaveRequestModalState.leaveRequest.leaveRequestTypeId ?? 0
              ) === +LeaveRequestTypeDefaults.SickLeave && (
                <div className='details-group'>
                  <CustomCheckBox
                    text='In Hospital'
                    id='inHospital'
                    onChange={(ret) => {
                      if (!leaveRequestModalState.leaveRequest.isAdmitted) {
                        dispatch(
                          leaveRequestModalActions.updateLeaveRequest({
                            elementName: 'illness',
                            value: undefined,
                          })
                        );
                      }
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest({
                          elementName: 'isAdmitted',
                          value: true,
                        })
                      );
                    }}
                    isChecked={!!leaveRequestModalState.leaveRequest.isAdmitted}
                  />
                  <CustomTextBox
                    title='Specify Illness'
                    name='illness'
                    value={
                      !leaveRequestModalState.leaveRequest.isAdmitted
                        ? ''
                        : leaveRequestModalState.leaveRequest.illness
                    }
                    onChange={(ret) => {
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest(ret)
                      );
                    }}
                  />
                  <CustomCheckBox
                    text='Out Patient'
                    id='outpatient'
                    onChange={(ret) => {
                      if (!!leaveRequestModalState.leaveRequest.isAdmitted) {
                        dispatch(
                          leaveRequestModalActions.updateLeaveRequest({
                            elementName: 'illness',
                            value: undefined,
                          })
                        );
                      }
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest({
                          elementName: 'isAdmitted',
                          value: false,
                        })
                      );
                    }}
                    isChecked={!leaveRequestModalState.leaveRequest.isAdmitted}
                  />
                  <CustomTextBox
                    title='Specify Illness'
                    name='illness'
                    value={
                      !!leaveRequestModalState.leaveRequest.isAdmitted
                        ? ''
                        : leaveRequestModalState.leaveRequest.illness
                    }
                    onChange={(ret) => {
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest(ret)
                      );
                    }}
                  />
                </div>
              )}
              {+(
                leaveRequestModalState.leaveRequest.leaveRequestTypeId ?? 0
              ) === +LeaveRequestTypeDefaults.SpecialLeaveBenefitforWomen && (
                <CustomTextBox
                  title='Specify Illness'
                  name='slbwIllness'
                  value={leaveRequestModalState.leaveRequest.slbwIllness}
                  onChange={(ret) => {
                    dispatch(leaveRequestModalActions.updateLeaveRequest(ret));
                  }}
                />
              )}
              {+(
                leaveRequestModalState.leaveRequest.leaveRequestTypeId ?? 0
              ) === +LeaveRequestTypeDefaults.StudyLeave && (
                <div className='study-leave-group'>
                  <CustomCheckBox
                    text="Completion of Master's Degree"
                    name='completionOfMatersDegree'
                    id='completionOfMatersDegree'
                    onChange={(ret) => {
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest(ret)
                      );
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest({
                          elementName: 'bar',
                          value: undefined,
                        })
                      );
                    }}
                    isChecked={
                      !!leaveRequestModalState.leaveRequest
                        .completionOfMatersDegree
                    }
                  />
                  <CustomCheckBox
                    text='BAR/Board Examination Review'
                    name='bar'
                    id='bar'
                    onChange={(ret) => {
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest(ret)
                      );
                      dispatch(
                        leaveRequestModalActions.updateLeaveRequest({
                          elementName: 'completionOfMatersDegree',
                          value: undefined,
                        })
                      );
                    }}
                    isChecked={!!leaveRequestModalState.leaveRequest.bar}
                  />
                </div>
              )}
            </div>
          </fieldset>
        </div>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save &amp; Print</span>
          </button>
        </div>
      </div>
      <>{employeeSearchableState.isModalShow && <EmployeeSearchable />}</>
    </Modal>
  );
}
