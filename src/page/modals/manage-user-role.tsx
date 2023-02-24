import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { getModules } from '../../repositories/module-queries';
import {
  insertUserRole,
  updateUserRole,
} from '../../repositories/user-role-queries';
import { userRoleModalActions } from '../../state/reducers/user-role-modal-reducer';
import { RootState } from '../../state/store';
import CollapsibleContainer from '../components/collapsible-container';
import CustomCheckBox from '../components/custom-checkbox';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManageUserRole({
  onClose,
}: {
  onClose: (hasChanges: boolean) => {};
}) {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const userRoleModalState = useSelector(
    (state: RootState) => state.userRoleModal
  );
  useEffect(
    () => {
      getMod();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(userRoleModalActions.setShowModal(false));
    onClose(hasChange);
  }
  async function getMod() {
    setBusy(true);
    await getModules()
      .then((res) => {
        if (res) {
          dispatch(userRoleModalActions.setModules(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (userRoleModalState.userRole.id > 0) {
      await updateUserRole(
        userRoleModalState.userRole.id,
        userRoleModalState.userRole.description ?? '',
        userRoleModalState.modules
          .filter((module) => module.isCheck)
          .flatMap(
            (modules) =>
              modules.moduleRights
                ?.filter((moduleRight) => moduleRight.isCheck)
                .map((moduleRight) => moduleRight.id) ?? []
          )
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'User role has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertUserRole(
        userRoleModalState.userRole.description ?? '',
        userRoleModalState.modules
          .filter((module) => module.isCheck)
          .flatMap(
            (modules) =>
              modules.moduleRights
                ?.filter((moduleRight) => moduleRight.isCheck)
                .map((moduleRight) => moduleRight.id) ?? []
          )
      )
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New user role has been added.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  return (
    <Modal
      className='user-role-modal'
      onClose={() => onModalClose(false)}
      title='Manage User Role'>
      <div className='modal-content-body'>
        <CustomTextBox
          title='Description'
          value={userRoleModalState.userRole?.description}
          onChange={(ret) => {
            dispatch(
              userRoleModalActions.setUserRole({
                ...userRoleModalState.userRole!,
                description: ret.value,
              })
            );
          }}
        />
        <div className='table-container user-role-modules-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th>Modules</th>
              </tr>
            </thead>
            <tbody>
              {userRoleModalState.modules.map((module) => (
                <tr key={module.id}>
                  <td>
                    <CollapsibleContainer
                      header={
                        <div>
                          <CustomCheckBox
                            text={module.description}
                            id={'module' + module.id}
                            checkChange={() => {
                              dispatch(
                                userRoleModalActions.checkModule(module.id)
                              );
                            }}
                            isCheck={module.isCheck ?? false}
                          />
                        </div>
                      }
                      content={
                        <div className='module-right-container'>
                          {module.moduleRights?.map((moduleRight) => (
                            <div key={moduleRight.id} className='module-right'>
                              <CustomCheckBox
                                text={moduleRight.right}
                                id={'module-right' + moduleRight.id}
                                checkChange={() => {
                                  dispatch(
                                    userRoleModalActions.checkModuleRight({
                                      moduleId: module.id,
                                      moduleRightId: moduleRight.id,
                                    })
                                  );
                                }}
                                isCheck={moduleRight.isCheck ?? false}
                              />
                            </div>
                          ))}
                        </div>
                      }></CollapsibleContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='modal-footer'>
        <button onClick={saveData} className='btn-modal btn-primary'>
          SAVE
        </button>
      </div>
    </Modal>
  );
}
