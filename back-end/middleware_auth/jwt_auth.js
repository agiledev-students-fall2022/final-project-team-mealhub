const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");
const config = require("../config/config-auth");
const User = require("../models/User");
const cookies = require("cookie-parser");

router.use(cookies());

const checkUser = (req, res, next) => {
  console.log("check user");
  //redirect to google.com
  return res.redirect("http://localhost:3000/Login");
  console.log(req.cookies)
  try {
    // console.log(req.cookies["jwt-token"])
    const token = req.cookies['jwt-token'];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        //res.cookie("token", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findByEmail(decodedToken.email);
        res.locals.user = user;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    //res.status(401).json({ error: "Not authorized to access this route" });
    //res.locals.user = null;
    console.log("no token");
    // res.redirect('http://localhost:3000');
    //naviagte redirect to  login rout
    next();

  }
  next();
};

//   const token = req.cookies["jwt-token"];
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         res.cookie("token", "", { maxAge: 1 });
//         next();
//       } else {
//         let user = await User.findByEmail(decodedToken.email);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     console.log("no token");
//     res.redirect("/login")
//     next();
//   }
// };

module.exports = { checkUser };

// verifyToken = async (req, res, next) => {
//   let token = req.session.token;

//   if (!token) {
//     return res.status(403).send({
//       message: "No token provided!",
//     });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!",
//       });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

// const authJwt = {
//     verifyToken,
// };

// module.exports = authJwt;
