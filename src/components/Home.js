import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {getbooks, deletebooks} from '../redux/book/bookSlice'


const Home = () => {
    const [fetchBooks, setFetchBooks] = useState(false);

    const dispatch = useDispatch();
    const {books,bookLoading,bookDelete} = useSelector(state=>state.book)

    useEffect(()=>{
        dispatch(getbooks());
    }, [fetchBooks])

    const deleteHandler = (id) => {
        dispatch(deletebooks(id));
    } 

    return (
        <>
            <div className='text-center mt-5 mb-5'>
                <Link to="/add"><button className="btn btn-primary">Add</button></Link>
            </div>

            {bookLoading ? 'Data Loading...' : 
            
            <>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tile</th>
                            <th scope="col">Body</th>
                            <th scope="col">&nbsp;</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.id+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td><Link to={`/update/${item.id}`}><button className="btn btn-primary">Edit</button></Link></td>
                                    <td><button className="btn btn-danger" onClick={()=>deleteHandler(item.id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
            
            }

            

        </>
    )
}

export default Home
