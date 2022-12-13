const express = require("express");
const router = express.Router();
const User = require("./models/User");
const jwt = require("jsonwebtoken");

// router.use(express.urlencoded({ extended: false }));
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const Cookies= require('js-cookie');


router.get("/", async (req, res) => {

    console.log("res cookie ", res.cookies)
        console.log("req cookie header", req.headers)
        console.log("user", res.locals)
        Cookies.get()
        console.log("js-cookie", Cookies.get())

    const token = req.cookies["jwt-token"];
    console.log("token", token);


    if (!token) {
        return res.status(401).send({ message: "No token provided!" });
    }else {
		return res.status(200).send({ message: "Success!" });
	}

});

module.exports = router;