import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Register() {
    const initialValues = {name:"", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
       
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
       
        if(!(formErrors.name) && !(formErrors.email)&& !(formErrors.password)){
            axios.post('http://localhost:8081/signup',formValues)
            .then(res=>{
                navigate('/');
            })
            .catch(err=>console.log(err));
       }   
    }

    const validate = (values) => {
        const errors = {}
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

         if (!values.name) {
            errors.name = "name is required!"
        }

        if (!values.email) {
            errors.email = "email is required!"
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!"
        }

        if (!values.password) {
            errors.password = "password is required!"
        } else if (values.password.length < 4) {
            errors.password = "password must be more than 4 characters!"
        }
        else if (values.password.length > 10) {
            errors.password = "password can not exceed more than 10 characters!"
        }

        return errors;
    }
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <div class="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeHolder="Enter Name" className="form-control" onChange={e => setFormValues({ ...formValues,name:e.target.value })}/>
                    </div>

                    <div class="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeHolder="Enter Email" className="form-control" onChange={e => setFormValues({ ...formValues,email:e.target.value })}/>
                    </div>

                    <div class="mb-2">
                        <label htmlFor="">Password</label>
                        <input type="password" placeHolder="***********" className="form-control" onChange={e => setFormValues({ ...formValues,password:e.target.value })}/>
                    </div>
                    <button className="btn btn-success">Register</button>
                </form>
                <Link to  ="/" className="btn btn-success" >Already have an account? Login here.</Link>
            </div>
        </div>
    )
}
export default Register;