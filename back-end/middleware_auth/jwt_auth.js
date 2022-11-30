const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const config = require("../config/config-auth");
const User = require("../models/User");
const cookies = require("cookie-parser");

router.use(cookies());

const checkUser = (req, res, next) => {
	console.log("check user");
	const token = req.cookies["jwt-token"];
	console.log("token: ", token);
	if (token) {
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
	} else {
		res.locals.user = null;

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
