import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/authContext';
import { useMessage } from '../hooks/message.hook';
import { useHistory } from 'react-router-dom';

const SignUpPage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    name: '',
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

  const registerHandler = async (event) => {
    event.preventDefault();
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      auth.login(data.token, data.userId);
      message(data.message);
      history.push('/login');
    } catch (e) {}
  };

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  return (
    <div className="row z-depth-6 card-panel auth-block">
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">face</i>
          <input
            id="user-name"
            type="text"
            name="name"
            className="validate"
            value={form.name}
            onChange={changeHandler}
          />
          <label htmlFor="user-name" data-error="wrong" data-success="right">Name</label>
        </div>
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
        <div className="card-action card-action-auth">
          <a
            href="/"
            className="btn waves-effect teal waves-light col auth-button"
            onClick={registerHandler}
            disabled={loading}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  )
};

export default SignUpPage;