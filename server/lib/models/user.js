let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type:String,
        default: "",
    },
    firstName: {
        type:String,
        default: "",
    },
    lastName: {
        type:String,
        default: "",
    },
    gender: {
        type:String,
        default: "",
    },
    mobile: {
        type:String,
        default: "",
    },
    fieldOfStudy: {
        type:String,
        default: "",
    },
    highestEducation: {
        type:String,
        default: "",
    },
    type: {
        type:String,
        default: "",
    },
    cv: {
        type:String,
        default: "",
    },
    role: {
        type: String,
        default: "user"
    }
});

let user = mongoose.model("Users", userSchema);

module.exports = user;