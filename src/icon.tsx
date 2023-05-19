import { AppName } from './constant';
import logo from './logo.png';
export default function Icon() {
  return (
    <div className='icon'>
      <img src={logo} alt='logo' />
      <label>{AppName}</label>
    </div>
  );
}
