const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { checkUser } = require("../middleware_auth/jwt_auth");
const Group = require("../models/Group");

//create an empty variable of type User



// Getting data at my group
router.get("/", checkUser, async (req, res) => {
	try {
		const user = res.locals.user;
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
