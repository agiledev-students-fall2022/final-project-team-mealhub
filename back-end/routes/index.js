const express = require("express");

const router = express.Router();

const axios = require("axios");

const mongoose = require("mongoose");

const Group = require("../models/Group");

// include root directory just redirecting to explore
router.get("/", (req, res) => {
	res.redirect("/explore");
});

// explore pages
// route /explore

router.get("/explore", async (req, res) => {
	try {
		// requesting resource from DB
		const groups = await Group.find({})
			.populate("user")
			.sort({ createdAt: "desc" })
			.lean();

		// console.log(groups);
		const response = await axios.get(
			`https://my.api.mockaroo.com/mealhub.json?key=2f898fd0`
		);
		//console.log(response.data);
		res.json([...groups, ...response.data]); // pass data along directly to client
	} catch (err) {
		res.json({
			success: false,
		});
	}
});

module.exports = router;
