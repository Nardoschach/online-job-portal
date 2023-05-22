const router = require('express').Router();
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
        req.session.user = registeredUser[0].email;

        return res.json({
            "msg" : "success"
        });

});

router.post("/signin", body("email").isEmail(), async function(req, res){
    let result = validationResult(req);

    // check email is valid
    if(!result.isEmpty()) {
        return res.json({
            "msg" : "invalid credential"
        });
    }

    let user = req.body;

    let usersFromDb = await User.find({email: user.email});
    if(usersFromDb.length == 0) {
        return res.json({
            "msg" : "invalid credential"
        });
    }

    // check the password is valid

    let isValid = await bcrypt.compare(user.password, usersFromDb[0].password);

    if(isValid) {
        req.session.user = usersFromDb[0].email;
        let user = {
            email : usersFromDb[0].email,
            firstName : usersFromDb[0].firstName,
            lastName : usersFromDb[0].lastName,
            gender : usersFromDb[0].gender,
            mobile : usersFromDb[0].mobile,
            fieldOfStudy : usersFromDb[0].fieldOfStudy,
            highestEducation : usersFromDb[0].highestEducation,
            cv : usersFromDb[0].cv,
        };
        return res.json(user);
    } 
    
    res.json({
        "msg" : "invalid credential"
    });
    
});


module.exports = function() {
    return router;
};