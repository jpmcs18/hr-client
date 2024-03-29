import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizeProvider } from './custom-hooks/authorize-provider';
import HomePage from './page/home-page';
import { refreshTokenAuthentication } from './repositories/base';
import { getTheme, getToken } from './repositories/session-managers';
import { userProfileAction } from './state/reducers/user-profile-reducer';
import { RootState } from './state/store';
import './style/style.css';
function App() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  useEffect(
    () => {
      if (getTheme()) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }

      if (!userProfileState.authorize) {
        if (getToken() !== undefined) {
          refreshTokenAuthentication();
        }
        dispatch(userProfileAction.initializeState());
      }
    },
    //eslint-disable-next-line
    []
  );
  return (
    <AuthorizeProvider>
      <HomePage />
    </AuthorizeProvider>
  );
}

export default App;
