import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import Loader from '../components/Loader';
import { AuthContext } from '../context/authContext';

const EditorTourPage = ({ match }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();

  const [categoryList, setCategoryList] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    short_description: '',
    images: '',
    category: null,
    price: 0,
  });

  useEffect(() => {
    const selects = document.querySelectorAll('select');
    window.M.FormSelect.init(selects, {});
    window.M.updateTextFields();
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    const selectList = document.querySelectorAll('select');
    window.M.FormSelect.init(selectList, {});
    request(`/api/category`, 'GET', null)
      .then(data => setCategoryList(data));
  }, [request]);

  useEffect(() => {
    if (match.params.id) {
      request(`/api/tour/${match.params.id}`, 'GET', null)
        .then(fetched => {
          setForm(prev => ({...prev, ...fetched}));
        });
    }
  }, [request, match, setForm]);

  const changeHandler = event => {
    event.preventDefault();
    setForm({...form, [event.target.name]: event.target.value});
  };

  const tourAction = async (event) => {
    event.preventDefault();
    console.log(form.category);
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
    <div className="container">
      <div className="row">
        <h4 className="center-align">Tour editor</h4>
        <form className="col s12">
          <div className="row">

            <div className="input-field col s12">
              <i className="material-icons prefix">title</i>
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
              <i className="material-icons prefix">short_text</i>
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
              <i className="material-icons prefix">description</i>
              <textarea
                id="description"
                type="text"
                name="description"
                className="materialize-textarea"
                value={form.description}
                onChange={changeHandler}
              />
              <label htmlFor="description">Description</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">burst_mode</i>
              <textarea
                id="images"
                type="text"
                name="images"
                className="materialize-textarea"
                value={form.images}
                onChange={changeHandler}
              />
              <label htmlFor="images">Images (one link per line)</label>
            </div>

            <div className="input-field col s6">
              <i className="material-icons prefix">filter_list</i>
              <select name="category" onChange={changeHandler} defaultValue={null}>
                {categoryList.map((category, index) =>
                  <option key={index} value={category.name}>{category.name}</option>
                )}
              </select>
              <label>Category</label>
            </div>

            <div className="input-field col s6">
              <i className="material-icons prefix">attach_money</i>
              <input
                min="0"
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
              className="waves-effect waves-light btn col s12 light-blue darken-1"
              onClick={tourAction}
            >
              Submit
            </a>

          </div>
        </form>
      </div>

    </div>
  );
};

export default EditorTourPage;
