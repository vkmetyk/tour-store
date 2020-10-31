import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/authContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      auth.login(data.token, data.userId);
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <>
      <h1>Authentication</h1>
      <div className="row z-depth-6 card-panel">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">mail_outline</i>
            <input
              id="email"
              type="email"
              name="email"
              className="validate"
              value={form.email}
              onChange={changeHandler}
            />
            <label htmlFor="email" data-error="wrong" data-success="right">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">lock_outline</i>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="card-action card-action-auth">
          <button
            className="btn waves-effect teal waves-light col"
            style={{marginRight: 15}}
            onClick={loginHandler}
            disabled={loading}
          >
            Sign in
          </button>
          <button
            className="btn waves-effect grey lighten-4 black-text waves-light col"
            onClick={registerHandler}
            disabled={loading}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};