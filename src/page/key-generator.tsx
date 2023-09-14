import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Pages } from '../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../custom-hooks/authorize-provider';
import { generateKey } from '../repositories/security-queries';
import CustomNumber from './components/custom-number';
import CustomTextBox from './components/custom-textbox';

export default function KeyGenerator() {
  const [id, setId] = useState<number>(0);
  const [app, setApp] = useState<string>('');
  const [key, setKey] = useState<string>('');

  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();

  async function transact() {
    setKey('');
    setBusy(true);
    await generateKey(id, app)
      .then((res) => {
        if (res) {
          setKey(res);
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  return (
    <>
      <section className='title-container'>
        <div className='title'>{Pages.KeyGenerator}</div>
      </section>
      <section className='search-main-container'>
        <CustomNumber
          type='number'
          title='Id'
          value={id}
          onChange={(ret) => setId(ret.value)}
        />
        <CustomTextBox
          title='App'
          value={app}
          onChange={(ret) => setApp(ret.value)}
        />
        <FontAwesomeIcon
          icon={faGears}
          onClick={transact}
          className='search-icon'
        />
      </section>
      <section>
        <h2>
          <p>{key}</p>
        </h2>
      </section>
    </>
  );
}
