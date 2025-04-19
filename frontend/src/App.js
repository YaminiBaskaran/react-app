import React from 'react';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './create';
import Login from './login';
import Register from './signup';
import Read from './read';
import Update from './update';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Login/>}></Route>
          <Route path ='/signup' element={<Register/>}></Route>
          <Route path ='/Home' element={<Home/>}></Route>
          <Route path ='/Create' element={<Create/>}></Route>
          <Route path ='/read/:id' element={<Read/>}></Route>
          <Route path ='/update/:id' element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
