import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addbook } from '../redux/book/bookSlice';

const Add = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({title:'', body:''});
  const {title, body} = formData;
  const [errors, setErrors] = useState({});

  const onchangeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  //console.log(formData)

  const formDataHandler = (e) => {
    e.preventDefault();
    setErrors(validation(formData));

    // dispatch(addbook({title,body}));
    // setFormData({title:'', body:''});
    // navigate('/');
  }

  const validation = (values) => {
    
    const errors = {};
    if(!values.title){
      errors.title = "Title is Required";
    }else if(values.title.length < 5){
      errors.title = "Name must be more then 5 charector"
    }
    if(!values.body){
      errors.body = "Password is Required";
    }else if(values.body.length < 5){
      errors.body = "Password must be more then 5 charector"
    }
    return errors;
  }

  // useEffect(()=>{
  //   if(Object.keys(errors).length === 0 && (values.title !== "" && values.body !== ""))
  //   alert("Form Submitted");
  // }, [errors])

  return (
    <>
      <p className='mt-5'><Link to='/'>Back to home</Link></p>
      <div className='row justify-content-center'>
        <div className='col-md-5 card'>
          <form className='card-body' onSubmit={formDataHandler}>
            <div className="mb-3">
              <label>Title</label>
              <input type="text" className="form-control" name="title" value={title} placeholder="Title" onChange={onchangeHandler} />

              {errors.title && <p style={{color:'red'}}>{errors.title}</p>}

            </div>
            <div className="mb-3">
              <label>Body</label>
              <input type="text" className="form-control" name="body" value={body} placeholder="Body" onChange={onchangeHandler} />

              {errors.body && <p style={{color:'red'}}>{errors.body}</p>}

            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Add
