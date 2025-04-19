import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";

function Home(){

    const navigate = useNavigate();
    const handleLogout = () => {
        axios.post('http://localhost:8081/logout')
        .then(res => {
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    const [data,setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/Home')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/Delete/'+id)
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <h2>Student list</h2>
                <button className="btn btn-sm btn-primary" onClick={handleLogout}>Log out</button>
                <div className='d-flex justify-content-end'>
                    <Link to='/Create' className='btn btn-success'>Create + </Link>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student,index) =>{
                            return <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Link to={`/Read/${student.id}`} className="btn btn-sm btn-info">Read</Link>
                                    <Link to={`/Update/${student.id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;