import React, { useContext } from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!authCtx.isLoggedIn && <Login onLogin={authCtx.onLogin} />}
        {authCtx.isLoggedIn && <Home onLogout={authCtx.onLogout} />}
      </main>
    </React.Fragment>
  );
}

export default App;
