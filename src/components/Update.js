import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { updatebook } from '../redux/book/bookSlice';

const Update = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {updateId} = useParams();

  const [formData, setFormData] = useState({title:'', body:''});
  const {title, body} = formData;

  const onchangeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  useEffect(()=>{
    axios.get(`/books/${updateId}`).then((res)=>{
        setFormData(res.data);
    })
  },[])

  const formDataHandler = (e) => {
    e.preventDefault();
    dispatch(updatebook({updateId,formData}));
    setFormData({title:'', body:''});
    navigate('/');
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
            </div>
            <div className="mb-3">
              <label>Body</label>
              <input type="text" className="form-control" name="body" value={body} placeholder="Body" onChange={onchangeHandler} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {" "}
            <NavLink to="/" type="button" className="btn btn-secondary">Cancel</NavLink>
          </form>
        </div>
      </div>
    </>
  )
}

export default Update
