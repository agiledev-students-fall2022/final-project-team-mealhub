const express = require("express");
const router = express.Router();
const Group = require("../models/Group");
const mongoose = require("mongoose");
const axios = require("axios");

// include root directory just redirecting to explore
// router.get("/", (req, res) => {
// 	res.redirect("/explore");
// });

router.patch("/:id", async (req, res) => {
	// const query = req.query;
	try {
		Group.findById(req.body.groupID, function (err, group) {
			// if (group) {
			group.members.push(mongoose.Types.ObjectId(req.params.id));
			group.save(function (err) {
				if (err) {
					console.error(err, " cant add ERROR!");
				}
			});
		});
		res.json({
			success: true,
		});
	} catch (err) {
		console.log("error is here");
		res.json({
			success: false,
		});
	}
});

router.delete("/", async (req, res) => {
	// const query = req.query;
	try {
		// find one and delete by ID and delete the entire group from the mongoDB database
		Group.findById(req.query.groupID, function (err, group) {
			// if (group) {
			group.members.pull(mongoose.Types.ObjectId(req.query.userID));
			// group.members = group.members.filter(function (value, index, arr) {
			// 	return value._id != mongoose.Types.ObjectId(req.params.id);
			// });
			group.save(function (err) {
				if (err) {
					console.error("ERROR!");
				}
			});
		});
		// const group = await Group.findById(req.params.id);
		// const group = await Group.findOne({ _id: req.params.id });

		// await group.save();
		res.json({
			success: true,
		});
	} catch (err) {
		res.json({
			success: false,
		});
	}
});

// explore pages
router.get("/explore", async (req, res) => {
	const q = req.query;

	try {
		// requesting resource from DB
		Group.find({})
			.populate("user")
			.populate("members")
			.limit(10)
			.skip(q.page * 10)
			.sort({ createdAt: "desc" })
			.lean()
			.exec((err, docs) => {
				if (err) {
					res.json({
						success: false,
					});
				} else {
					Group.find({})
						.populate("user")
						.populate("members")
						.countDocuments((err, count) => {
							res.json({
								docs,
								count,
							});
						});
				}
			});
	} catch (err) {
		res.json({
			success: false,
		});
	}
});

module.exports = router;
