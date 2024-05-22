const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
const app= express();

//connecting model (database) to the backend
const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
mongoose.connect(`mongodb+srv://kaustubhsharma1601:${encodedPassword}@job.nrad5pb.mongodb.net/?retryWrites=true&w=majority&appName=Job`)
    .then(() => console.log('Database Connected!'))
    .catch((e) => { console.log("monggo error", e) })


app.use(express.json());


app.get("/",(req,res)=>{
    
    res.send("hello world")
})
app.post("/submit",(req,res)=>{
    const {name,age} = req.body
    res.send(`name is ${name} and age is ${age}`)
})

app.listen(`${process.env.PORT}`,()=>{
    console.log("server started!!")
})