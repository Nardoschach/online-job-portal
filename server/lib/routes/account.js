const router = require("express").Router();
const {body, validationResult} = require("express-validator");
const user = require("../models/user");

// TODO add password change ablity

router.post("/",
    body("firstName", "first name required").notEmpty(),
    body("lastName", "last name required").notEmpty(),
    body("mobile","invalid mobile").isMobilePhone(),
    body("gender", "invalid gender").isIn(["male", "female"]).contains(),
    body("fieldOfStudy", "field of study required").notEmpty(),
    body("highestEducation", "highest education required").notEmpty(),
    body("type", "invalid type").isIn(["applicant with experiance", "fresh graduate", "staff"]),

    async function(req, res) {

        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.json(result.array());
        }

        const data = req.body;
        console.log(data);

        // update user model
        req.user.firstName = data.firstName;
        req.user.lastName = data.lastName;
        req.user.gender = data.gender;
        req.user.mobile = data.mobile;
        req.user.fieldOfStudy = data.fieldOfStudy;
        req.user.highestEducation = data.highestEducation;
        req.user.type = data.type;
        req.user.cv = data.cv;

        try {
             await req.user.save();
        } catch(e) {
            next(e);
        }
       

        res.send(req.user);
    }
);

module.exports = function() {
    return router;
}

 