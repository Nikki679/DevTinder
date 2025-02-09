const mongoose = require ('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        trim:true,
        minLength:4,
        maxLength:15
    },
    lastName: {
        type: String,
        trim:true,
        minLength:4,
        maxLength:15
    },
    emailId:{
        type:String,
        required:true,
        unique: true,
        trim:true,
        toLowerCase: true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Email id is not valid")
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required: true,
        minLength:8,
        validate(value)
        {
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Please enter strong password")
            }
        }
    },
    mobileNo:{
        type:String,
        required: true,
        minLength:10,
    },
    age:{
        type:Number,
        maxLength:3
    },
    gender:{
        type:String,
        validate(value)
        {
            if(!["male","female","other"].includes(value))
                {
                    throw new Error("Please specify valid gender")
                }
        }
    },
    about:{
        type:String,
        default:"There is description about me"
    },
    skills:{
        type:[String]
    }
},
{ timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User;