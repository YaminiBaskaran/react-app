import { useEffect , useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from 'axios';

function Update(){

    const {id} = useParams();
    const [values,setValues] = useState({
        name:'',
        email:''
    })
	
    useEffect(() => {
        axios.get('http://localhost:8081/Read/'+id)
        .then(res => {
            console.log(res)
            setValues({...values,name:res.data[0].name,email:res.data[0].email})
        })
        .catch(err => console.log(err));
    },[])

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:8081/Update/'+id,values)
        .then(res => {
            console.log(res);
            navigate('/Home')
        })
        .catch(err => console.log(err));
    }


    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Edit Student</h2>
                    <div class="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" value={values.name} className="form-control" onChange={e => setValues({...values,name:e.target.value})}/>
                    </div>

                    <div class="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" value={values.email} className="form-control" onChange={e => setValues({...values,email:e.target.value})}/>
                    </div>
                    <button className="btn btn-success">Edit</button>
                </form>
            </div>
        </div>
    );
}

export default Update;