// import and instantiate express
const express = require("express");
const app = express();
require("dotenv").config();

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morgan = require("morgan"); // log requests

// displaying loggin details in dev
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// router for login and explore
app.use("/", require("./routes/index"));
app.use("/search", require("./routes/search"));
//router for profilePage and editProfilePage
app.use("/profilePage", require("./routes/profilePage"));
app.use(require("./routes/editProfilePage"));
module.exports = app;
