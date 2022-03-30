const mongooose = require("mongoose");
const { Schema } = mongooose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username : {
        type : String,
        required: true
    }, 
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    }
});

userSchema.set("toJSON", {
    transform : (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.password;
    },
});

userSchema.plugin(uniqueValidator, {message : "Email already in use"});

const User = mongooose.model("user", userSchema);
module.exports = User;