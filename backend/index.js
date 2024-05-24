const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const multer = require('multer');
const {v4:uuidv4} = require("uuid")
const { setUser , getUser } = require('./services/session')

const job = require("./models/todo")
const Users = require("./models/user")

require("dotenv").config()
const app = express();


//connecting model (database) to the backend
const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
mongoose.connect(`mongodb+srv://kaustubhsharma1601:${encodedPassword}@job.nrad5pb.mongodb.net/?retryWrites=true&w=majority&appName=Job`)
.then(() => console.log('Database Connected!'))
.catch((e) => { console.log("monggo error", e) });

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true // Allow cookies to be sent
  }))
const upload = multer()
app.use(upload.none())


//signup user
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body
    try {
        const createdUser = await Users.create({
            Username : username,
            Email : email,
            Password: password
        })
        res.send(createdUser)
    } catch (e) {
        console.log(e)
        res.send("sign up failed!!")
    }
})
//user login
app.post("/login",async (req,res)=>{
    const {username,password} = req.body

    try{

        const _loginusername = await Users.findOne({
            Username:username
        })
        const _loginpassword = await Users.findOne({
            Password:password
        })
        // console.log(_loginpassword)
        if(_loginpassword && _loginusername == null){
            res.status(400).send("wrong username")
        }
        else if(_loginpassword==null && _loginusername){
            res.status(400).send("wrong password")
        }
        else if(_loginpassword && _loginusername){
            //redirect to signup page
            const sessionID = uuidv4();
            
            
            
            setUser(sessionID,_loginusername)
            const himu = getUser(sessionID)
            
            res.cookie("uid",sessionID);

            res.status(200).send("good to go")
        }
        else{
            res.status(401).send("wrong password")
        }

    }catch(e){
        console.log(e)
        res.send("error!!")
    }
})

app.get("/", async (req, res) => {
    const sessionID = uuidv4();
    res.cookie("hii",sessionID)
    res.send("ok")
})

//getting task
app.get("/tasks", async (req, res) => {
    const tasks = await job.find();
    res.send(tasks)
})

//creating task
app.post("/submit", upload.none(), async (req, res) => {
    const { title, priority, comp } = req.body
    const ctime = new Date(comp)
    const _job = await job.create({
        title: `${title}`,
        priority: `${priority}`,
        completeTime: `${ctime}`
    })
    console.log("Done")
})

//deleting task
app.delete("/delete", async (req, res) => {
    try {
        // const findTask = await job.find({priority:"2"})
        // res.send(findTask)
        const deletedTask = await job.deleteMany({ priority: "2" })
        if (!deletedTask) {
            res.status(404).json({ message: "task not found" })
        }
        res.status(200).json({ message: "deleted succesfully" })
    } catch (e) {
        console.log(e)
    }
})


app.listen(`${process.env.PORT}`, () => {
    console.log("server started!!")
})