const mongoose  = require("mongoose")
//creating schema
const Schema = mongoose.Schema

const signupSchema = new Schema(
    {
        Username : {
            type : String,
            required : true,
            unique : true
        },
        Email : {
            type : String,
            required : true,
            unique : true
        },
        Password : {
            type : String,
            required : true
        }
    },{
        timestamps : true
    }
)
//  creating model and assigning to variable
const User = mongoose.model('User', signupSchema)

module.exports = User;  