const express = require("express");
const router = express.Router();
const Group = require("../models/Group");

// include root directory just redirecting to explore
router.get("/", (req, res) => {
	res.redirect("/explore");
});

// explore pages
router.get("/explore", async (req, res) => {
	const q = req.query;
	try {
		// requesting resource from DB
		Group.find({})
			.populate("user")
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
