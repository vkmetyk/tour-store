import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import TourPage from './pages/TourPage';
import EditorTourPage from './pages/EditorTourPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/tour/:id" component={TourPage} />
        <Route path="/editor/tour/:id" component={EditorTourPage} />
        <Route path="/editor/tour" component={EditorTourPage} />
        <Route path="/login" exact component={SignInPage} />
        <Route path="/register" exact component={SignUpPage} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/login" exact component={SignInPage} />
      <Route path="/register" exact component={SignUpPage} />
      <Redirect to="/register" />
    </Switch>
  )

}