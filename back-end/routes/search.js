const express = require("express");
const router = express.Router();
const Group = require("../models/Group");

router.get("/", async (req, res) => {
	const q = req.query;
	Group.find({restaurant: new RegExp(`^${'.*'+q.search+'.*'}$`, 'i')}).sort({ createdAt: "desc" }).exec((err, docs) => {
		if (err) {
			res.json({
				success: false,
			});
		} else {
			Group.find({restaurant: new RegExp(`^${'.*'+q.search+'.*'}$`, 'i')}).countDocuments((err, count) => {
				res.json({
					docs,
					count
				})
			})
		}
	})
});

module.exports = router;