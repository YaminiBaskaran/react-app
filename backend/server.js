import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:'secret',    //a secret key used to encrypt session
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60*24
    }   //set the session cookie property
}))

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sample"
})

app.post('/signup',(req,res) =>{
    const sql ="INSERT INTO user (`name`,`email`,`password`) VALUES (?)";
    const values =[
        req.body.name,
        req.body.email,
        req.body.password
    ]

    db.query(sql,[values],(err,data) =>{
        if(err){
         return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/logout',(req,res) => {
    req.session.destroy();
    return res.json("success")
})

app.post('/login',(req,res) => {
    const sql = "SELECT * FROM user WHERE `email` =? AND `password` =? ";
    db.query(sql,[req.body.email,req.body.password],(err,data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            return res.json("Success");
        }
        else{
            return res.json("Failure");
        }
    })
})

app.get('/Home',(req,res) => {
    const sql = "SELECT * FROM student";
    db.query(sql,(err,result) => {
        if(err)
            return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.post('/student',(req,res)=>{
    const sql = "INSERT INTO student (`name`,`email`) VALUES (?)";
    console.log(req.body)
    const values = [
        req.body.name,
        req.body.email
    ]
    
    db.query(sql,[values],(err,result) => {
        if(err)
            return res.json(err);
        return res.json(result);
    })
})

app.get('/Read/:id',(req,res)=>{
    const sql = "SELECT * FROM student WHERE id=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result) => {
        if(err)
            return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.put('/Update/:id',(req,res)=>{
    const sql = "UPDATE student SET `name`=?,`email`=? WHERE id=?";
    const id = req.params.id;
    db.query(sql,[req.body.name,req.body.email,id],(err,result) => {
        if(err)
            return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.delete('/Delete/:id',(req,res)=>{
    const sql = "DELETE from student  WHERE id=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result) => {
        if(err)
            return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.listen(8081,() =>{
    console.log("Running");
});