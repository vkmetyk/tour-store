import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/authContext';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';
import './index.css';

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
      token, login, logout, userId, userRole, isAuthenticated
    }}>
      <Router>
        <Navbar/>
        <Sidebar />
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;