import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addbook } from '../redux/book/bookSlice';

const Add = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({title:'', body:''});
  const {title, body} = formData;

  const onchangeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  //console.log(formData)

  const formDataHandler = (e) => {
    e.preventDefault();
    dispatch(addbook({title,body}));
    setFormData({title:'', body:''});
    navigate('/');
  }

  const validate = (values) => {
    const errors = {};
    if(!values.name){
      errors.title = "Title is Required";
    }

  }

  return (
    <>
      <p className='mt-5'><Link to='/'>Back to home</Link></p>
      <div className='row justify-content-center'>
        <div className='col-md-5 card'>
          <form className='card-body' onSubmit={formDataHandler}>
            <div className="mb-3">
              <label>Title</label>
              <input type="text" className="form-control" name="title" value={title} placeholder="Title" onChange={onchangeHandler} />
              <p>{formErrors.title}</p>
            </div>
            <div className="mb-3">
              <label>Body</label>
              <input type="text" className="form-control" name="body" value={body} placeholder="Body" onChange={onchangeHandler} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Add
