import Modal from './modal';

export default function ManageEmployee({
  onClose,
}: {
  onClose: (hasChanges: boolean) => {};
}) {
  // const [hasChanges, setHasChanges] = useState<boolean>(false);
  return (
    <Modal
      className='profile-modal'
      onClose={() => {
        onClose(true);
      }}
      title='Users Profile'
      children={undefined}></Modal>
  );
}
