const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer');
const job = require("./models/todo")
const Users = require("./models/user")

require("dotenv").config()
const app = express();

//connecting model (database) to the backend
const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
mongoose.connect(`mongodb+srv://kaustubhsharma1601:${encodedPassword}@job.nrad5pb.mongodb.net/?retryWrites=true&w=majority&appName=Job`)
    .then(() => console.log('Database Connected!'))
    .catch((e) => { console.log("monggo error", e) });

const upload = multer()

app.use(express.json());
app.use(cors())
app.use(upload.none())

//signup user
app.post("/user", async (req, res) => {
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