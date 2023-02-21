import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { searchEmployee } from '../../repositories/employee-queries';
import { employeeActions } from '../../state/reducers/employee-reducer';
import { RootState } from '../../state/store';
import Modal from './modal';

export default function ManageEmployee({
  onClose,
}: {
  onClose: (hasChanges: boolean) => {};
}) {
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  return (
    <Modal
      className='profile-modal'
      onClose={() => {
        onClose(hasChanges);
      }}
      title='Users Profile'
      children={undefined}></Modal>
  );
}
