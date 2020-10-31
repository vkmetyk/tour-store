import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/authContext';

const EditorTourPage = ({ match }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const message = useMessage();
  const [form, setForm] = useState({
    title: '',
    description: '',
    short_description: '',
    img: '',
    category: '',
    price: 0,
  });

  const {loading, request, error, clearError} = useHttp();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  });

  useEffect(() => {
    if (match.params.id) {
      request(`/api/tour/${match.params.id}`, 'GET', null)
        .then(fetched => {
          setForm(prev => ({
            ...prev,
            ...fetched[0]
          }));
        })
    }
  }, [request, match, setForm]);

  const changeHandler = event => {
    event.preventDefault();
    setForm({...form, [event.target.name]: event.target.value});
  };

  const createNewTour = async (event) => {
    event.preventDefault();
    try {
      if (match.params.id) {
        await request(`/api/tour/update/${match.params.id}`, 'PUT', {...form}, {
          Authorization: `Bearer ${auth.token}`
        });
        message('Edition was successful');
      } else {
        await request('/api/tour/create', 'POST', {...form}, {
          Authorization: `Bearer ${auth.token}`
        });
        message('Creation was successful');
      }
      history.push('/');
    } catch (e) {}
  };

  if (loading)
    return <Loader />;

  return (
    <>
      <div className="row">
        <form className="col s12">
          <div className="row">

            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="img"
                type="text"
                name="img"
                className="validate"
                value={form.img}
                onChange={changeHandler}
              />
              <label htmlFor="img">Image (just link supported)</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="title"
                type="text"
                name="title"
                className="validate"
                value={form.title}
                onChange={changeHandler}
              />
              <label htmlFor="title">Title</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="short-description"
                type="text"
                name="short_description"
                className="validate"
                value={form.short_description}
                onChange={changeHandler}
              />
              <label htmlFor="short-description">Short description</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="description"
                type="text"
                name="description"
                className="validate"
                value={form.description}
                onChange={changeHandler}
              />
              <label htmlFor="description">Description</label>
            </div>

            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="category"
                type="text"
                name="category"
                className="validate"
                value={form.category}
                onChange={changeHandler}
              />
              <label htmlFor="category">Category</label>
            </div>

            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="price"
                type="number"
                name="price"
                className="validate"
                value={form.price}
                onChange={changeHandler}
              />
              <label htmlFor="price">Price</label>
            </div>

            <a
              href="/"
              className="waves-effect waves-light btn col s12"
              onClick={createNewTour}
            >
              Submit
            </a>

          </div>
        </form>
      </div>

    </>
  );
};

export default EditorTourPage;
