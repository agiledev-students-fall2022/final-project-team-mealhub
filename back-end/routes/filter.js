const express = require("express");

const router = express.Router();

const axios = require("axios");

const Group = require("../models/Group");

const devURL = "https://my.api.mockaroo.com/mealhub.json?key=2f898fd0";

router.post("/", async (req, res) => {
	try {
		const dataRecieved = {
			status: "success!",
			data: {
				...req.body,
			},
		};

		const query = {};

		if (req.body.date !== "") {
			query["date"] = new Date(req.body.date);
		}

		for (const property in req.body) {
			if (
				req.body[property] !== "" &&
				property !== "budget" &&
				property !== "date"
			) {
				query[property] = new RegExp(`${req.body[property]}`, "i");
			}
		}

		const response = await Group.find({
			...query,
			budget: {
				$lte: req.body.budget.current[1],
				$gte: req.body.budget.current[0],
			},
		}).exec((err, docs) => {
			if (err) {
				console.log(err);
				res.json({
					success: false,
				});
			} else {
				Group.find({
					...query,
					budget: {
						$lte: req.body.budget.current[1],
						$gte: req.body.budget.current[0],
					},
				}).countDocuments((err, count) => {
					console.log(count);
					res.json({
						docs,
						count,
					});
				});
			}
		});
		// res.json(response.data);

		// query the data base for the response
	} catch (err) {
		res.json({
			success: false,
		});
	}
});

module.exports = router;
