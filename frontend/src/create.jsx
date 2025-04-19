import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Create(){

    const [values,setValues] = useState({
        name:'',
        email:''
    })

    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8081/student',values)
        .then(res => {
            navigate('/Home')
        })
        .catch(err => console.log(err))
    }


    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div class="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeHolder="Enter Name" className="form-control" onChange={e => setValues({...values,name:e.target.value})}/>
                    </div>

                    <div class="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeHolder="Enter Email" className="form-control" onChange={e => setValues({...values,email:e.target.value})}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;