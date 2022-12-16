// import and instantiate express
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const session = require("express-session");
const { checkUser } = require("./middleware_auth/jwt_auth");
const cookieParser = require('cookie-parser')



const connectDB = require("./config/connectDB"); // helper to connect to DB
connectDB();

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//     cookieSession({
//       name: "mealhub-session",
//       secret: "COOKIE_SECRET", // should use as secret environment variable
//       httpOnly: true
//     })
//   );

const morgan = require("morgan"); // log requests

// displaying loggin details in dev
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// router for login and explore
app.use("/", require("./routes/index"));
app.use("/filter", require("./routes/filter"));
app.use("/search", require("./routes/search"));

//router for profilePage and editProfilePage
app.use(checkUser);
app.use(require("./routes/profilePage"));
app.use("/myGroup", require("./routes/myGroup") );
app.use(require("./routes/editProfilePage"));
app.use(require("./routes/editImage"));
app.use("/createGroup", require("./routes/createGroup"));

//Redirect everyother 404 request to errorPage


//router for login
 //app.use("/login", require("./routes/auth_routes"));
// app.use("/register", require("./routes/auth_routes"));

app.use(cookieParser());


(require('./routes/auth_routes'))(app)

module.exports = app;
