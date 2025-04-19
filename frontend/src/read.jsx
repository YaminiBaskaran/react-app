import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function Read(){

    const {id} = useParams();
    const [student,setStudent] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/Read/'+id)
        .then(res => {
            console.log(res)
            setStudent(res.data[0]);
        })
        .catch(err => console.log(err))
    },[])

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <div className="p-2">
                    <h2>Student Detail</h2>
                    <h3>ID:{student.id}</h3>
                    <h3>Name:{student.name}</h3>
                    <h3>Email:{student.email}</h3>
                </div>
                <Link to='/Home' className="btn btn-primary me-2">Back</Link>
                <Link to={`/Update/${student.id}`} className="btn btn-info">Edit</Link>
            </div>
        </div>
    );
}
export default Read;