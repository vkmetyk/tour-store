import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/authContext';
import { useMessage } from '../hooks/message.hook';
import { useHistory } from 'react-router-dom';

const SignInPage = () => {
  const history = useHistory();
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

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data);
      history.push('/');
    } catch (e) {}
  };

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  return (
    <div className="row z-depth-6 card-panel auth-block">
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
      <div className="card-action card-action-auth row">
        <button
          className="btn waves-effect waves-light col s5 center-block light-blue darken-1"
          onClick={loginHandler}
          disabled={loading}
        >
          Log in
        </button>
      </div>
    </div>
  )
};

export default SignInPage;