import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import TourPage from './pages/TourPage';
import EditorTourPage from './pages/EditorTourPage';
import ProfilePage from './pages/ProfilePage';

export const useRoutes = (isAuthenticated, isAdmin) => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/tour/:id" component={TourPage} />
      <Route path="/login" exact component={SignInPage} />
      <Route path="/register" exact component={SignUpPage} />
      {isAuthenticated && <Route path="/profile" exact component={ProfilePage} />}
      {/*{isAuthenticated && <Route path="/profile/orders" exact component={OrdersPage} />}*/}
      {(isAuthenticated && isAdmin) && <Route path="/editor/tour/:id" component={EditorTourPage} />}
      {(isAuthenticated && isAdmin) && <Route path="/editor/tour" component={EditorTourPage} />}
      <Redirect to="/" />
    </Switch>
  )
}