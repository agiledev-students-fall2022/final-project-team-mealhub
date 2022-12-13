const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { checkUser } = require("../middleware_auth/jwt_auth");
const Group = require("../models/Group");

//create an new empty user object vairbale global
let test = {
	_id: "",
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	image: "",
	createdAt: "",
};

// displayName: 'Dev Kalavadiya',
// 0|mealhub  |   firstName: 'Dev',
// 0|mealhub  |   lastName: 'Kalavadiya',
// 0|mealhub  |   email: 'dk3936@nyu.edu',
// 0|mealhub  |   password: '$2b$10$fGxkTbWUdXaIHY4b1OITye8voHUgyjRptmFo8czX0.DRHWb/DwsM2',
// 0|mealhub  |   image: '/uploads/defaultProfilePic.png',
// 0|mealhub  |   createdAt: 2022-11-30T06:58:41.010Z,




// Getting data at my group
router.get("/", async (req, res) => {
	try {
		const user = res.locals.user;
		test = 
		{
			_id: user._id,
			firstname: user.firstName,
			lastname: user.lastName,
			email: user.email,
			password: user.password,
			image: user.image,
			createdAt: user.createdAt,
		};
		// console.log(test);

		const groups = await Group.find({ members: user._id })

			// requesting resource from DB
			.populate("user")
			.sort({ createdAt: "desc" })
			.lean();

		res.json([...groups]);
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
});

// get axios delete request from Mycards and remove user ID from the members list of the group object
router.delete("/:id", async (req, res) => {
	try {
		const group = await Group.findByIdAndDelete(req.params.id);
		res.json({
			success: true,
		});
	} catch (err) {
		res.json({
			success: false,
		});
	}
});

module.exports = router;
