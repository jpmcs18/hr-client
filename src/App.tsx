import { useEffect } from 'react';
import { AuthorizeProvider } from './custom-hooks/authorize-provider';
import HomePage from './page/home-page';
import { getTheme } from './repositories/session-managers';
import './style/style.css';
function App() {
  useEffect(
    () => {
      if (getTheme()) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
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
