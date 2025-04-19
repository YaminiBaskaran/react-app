import React, { useState } from "react";
import{Link}from  'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        if(!(formErrors.email) && !(formErrors.password))
        {
            axios.post('http://localhost:8081/login',formValues)
            .then(res=>{
                if(res.data ==="Success"){
                    navigate('/Home');
                }
                else{
                    alert("No record existed");
                }
            })
            .catch(err=>console.log(err));
        }         
    }

    const validate = (values) => {
        const errors = {}
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


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
    return (        
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <div class="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeHolder="Enter Email" className="form-control" onChange={e => setFormValues({ ...formValues,email:e.target.value })}/>
                        {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
                    </div>

                    <div class="mb-2">
                        <label htmlFor="">Password</label>
                        <input type="password" placeHolder="***********" className="form-control" onChange={e => setFormValues({ ...formValues,password:e.target.value })}/>
                        {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
                    </div>
                    <button className="btn btn-success">Log in</button>
                </form>
                <Link to  ="/signup" className="btn btn-success" >Don't you have an account? Register here.</Link>
            </div>
        </div>
    )
}

export default Login;