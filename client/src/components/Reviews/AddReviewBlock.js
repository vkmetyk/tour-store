import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useMessage } from '../../hooks/message.hook';
import { useHttp } from '../../hooks/http.hook';

const AddReviewBlock = ({ tourId }) => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();

  const [form, setForm] = useState({
    tourId: tourId,
    text: '',
    rate: null,
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  });

  const changeHandler = event => {
    event.preventDefault();
    setForm({...form, [event.target.name]: event.target.value});
  };

  const leftReview = async (event) => {
    event.preventDefault();
    try {
      await request('/api/review/create', 'POST', {...form}, {
        Authorization: `Bearer ${auth.token}`
      });
      message('Review successfully posted');
    } catch (e) {}
  };

  return (
    <div className="row col s12 card-panel add-review-block grey lighten-5">
      <div className="input-field col s12">
        <i className="material-icons prefix">rate_review</i>
        <textarea
          disabled={loading}
          id="new-review"
          type="text"
          name="text"
          className="materialize-textarea"
          value={form.description}
          onChange={changeHandler}
        />
        <label htmlFor="new-review">Review</label>
      </div>
      <div className="col s12 right-align">
        <a href="/"
           className="btn waves-effect light-blue darken-1"
           onClick={leftReview}
        >
          Send
        </a>
      </div>
    </div>
  );
};

export default AddReviewBlock;