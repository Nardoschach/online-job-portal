let express = require("express");
let auth = require("./lib/routes/auth");
let account = require("./lib/routes/account");
let loadUser = require("./lib/middlewares/loaduser");
let mongoose = require("mongoose");
let session = require("express-session");


let app = express();


app.use(express.json());
app.use(session({secret: "kljdjfkdas", resave: false, saveUninitialized: true, cookie: {maxAge: 24 * 60 * 60 * 1000}}));
app.use("/auth", auth());
app.use(loadUser());
app.use("/account",account());

(async() => {
   try {
    await mongoose.connect("mongodb://127.0.0.1:27017/job-app");
    app.listen(3000,()=>{console.log("server start running")});
   } catch (e) {
    console.log(e);
   }

})();
