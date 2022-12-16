const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const config = require("../config/config-auth");
const User = require("../models/User");
const cookies = require("cookie-parser");

router.use(cookies());

const checkUser = async (req, res, next) => {
  if(req.cookies == null)
  {
    next()
  }
  else{
	const token = req.cookies["jwt-token"];
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				let user = await User.findOne({email:decodedToken.email}).then((resp)=>{
          res.locals.user = resp;
          next();
        }
        );
			}
		});
	} else {
		res.locals.user = null;

		next();
	}
}
};

module.exports = { checkUser };


