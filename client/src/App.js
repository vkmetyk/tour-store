import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/authContext';
import Loader from './components/Loader';
import './index.css';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  const {token, login, logout, userId, userRole, ready} = useAuth();
  const isAuthenticated = !!token;
  const isAdmin = userRole === 'admin';
  const routes = useRoutes(isAuthenticated, isAdmin);

  if (!ready) {
    return <Loader/>;
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, userRole, isAuthenticated, isAdmin
    }}>
      <Router>
        <Header/>
        <main>
          {routes}
        </main>
        <Footer/>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;