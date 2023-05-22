const mongoose = require("mongoose");
const User = require("../models/user");
const user = require("../models/user");

async function loadUser(req, res, next){

    if(req.session.user) {
      const users = await User.find({email: req.session.user});
      req.user = users[0];
    } 

    next();

}

module.exports = ()=>loadUser;