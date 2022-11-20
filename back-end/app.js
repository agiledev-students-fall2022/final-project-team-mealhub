// import and instantiate express
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
// const authRoute = require('./routes/auth')
const session = require('express-session')
const passport = require('passport')

const connectDB = require("./config/connectDB"); // helper to connect to DB
connectDB();

app.use(cors());

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morgan = require("morgan"); // log requests

// displaying loggin details in dev
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks
        httpOnly: false,
        secure: false,
    },
}));


// router for login and explore
app.use("/", require("./routes/index"));
app.use("/filter", require("./routes/filter"));
app.use("/search", require("./routes/search"));

//router for profilePage and editProfilePage
app.use(require("./routes/profilePage"));
app.use("/myGroup", require("./routes/myGroup"));
app.use(require("./routes/editProfilePage"));
app.use(require("./routes/editImage"));
app.use("/createGroup", require("./routes/createGroup"));

app.use("/auth", require("./routes/auth"));

app.use(passport.initialize());
app.use(passport.session());




//router for login
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));


module.exports = app;
