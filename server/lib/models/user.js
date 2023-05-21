let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
});

let user = mongoose.model("User", userSchema);

module.exports = user;