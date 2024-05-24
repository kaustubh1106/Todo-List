const mongoose  = require("mongoose")
//creating schema
const Schema = mongoose.Schema

const todoSchema = new Schema(
    {
        createdBy : {
            type : Schema.Types.ObjectId,
            ref : 'user'
        },
        title : {
            type: String,
            trim: true,
            required: true
        },
        priority : {
            type: String,
            enum: ["1","2","3"]
        },
        completeTime : {
            type: Date,
            required: true
        },
        status : {
            type : String,
            enum: ['Pending', 'In Progress' ,'Completed'],
            default: 'Pending'
        },
        created : {
            type : Date,
            default: Date.now()
        }
    }
)
//  creating model and assigning to variable
const Task = mongoose.model('Task', todoSchema)

module.exports = Task;  