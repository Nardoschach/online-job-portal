let router = require('express').Router();
let {body, matchedData, validationResult} = require("express-validator");
let User = require("../models/user");
let bcrypt = require("bcrypt");

router.post("/signup", 
    body("email", "email is not valid").isEmail().toLowerCase(),
    body("password", "password has few characters").isLength(8),
    async function (req, res) {
        let result = validationResult(req);

        // credential are not valid
        if(!result.isEmpty()) {
           //TODO send status code 
           return res.json(result.array());
        }

        let data = matchedData(req);
        
        // check if user already signed up

        let user = await User.find({email : data.email});
        if(!user.length == 0){
           return res.json({
                "msg" : "user already exist"
            });
        }

        // hash the password
        let hasedPassword = await bcrypt.hash(data.password, 10);

        // register user to db
        let newUser = new User({email : data.email, password: hasedPassword});
        let registeredUser = await newUser.save();
        req.session.user = registeredUser.email;

        return res.json({
            "msg" : "success"
        });

});



module.exports = function() {
    return router;
};