const express = require("express");
const router = express.Router();
const axios = require("axios");
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const mongoose = require("mongoose");
const Group = require("../models/Group");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { checkUser } = require("../middleware_auth/jwt_auth");
const cookies = require("cookie-parser");

router.use(cookies());

// @route   POST api/groups
mongoose.connect(
	"mongodb+srv://mealhub12345:mealhub12345@cluster0.rx68d3c.mongodb.net/?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

router.use(cors());
router.use((req, res, next) => {
	res.header(
		"Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
		"Origin, X-Requested-with, Content_Type,Accept,Authorization",
		"http://localhost:3001"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
		return res.status(200).json({});
	}
	next();
});

// console.log(user);
// const token = req.cookies.token;
// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// const user = await User.findById(decoded.id);
// router.get("/", async (req, res) => {
//   try {
//     // const groups = await Group.find();

//     console.log(req.cookies);

//     // res.json(groups);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

//get current user using checkUser middleware
// router.get("/jwt_auth", checkUser, async (req, res) => {
//   console.log("guser found");
// });

router.use(express.json());

router.post("/", checkUser, async (req, res) => {
	if (res.locals.user !== null) {
		console.log(res.locals.user);
		console.log("create group");
		// const user = await User.findByEmail(req.user.email);
		//   res.json(user);
		//   console.log(user)

		// console.log(req.cookie);

		//res.send(req.body);
		// Destrucring Data
		let title = req.body.restaurant;
		let description = req.body.description;
		let capacity = req.body.attendees;
		let budget = req.body.budgetDollar;
		let dress_code = req.body.dress;
		let date = req.body.date;
		let time = req.body.time;
		let cuisine = req.body.cuisine.toLowerCase();
		//Get user ID from JWT token

		// let user =
		let location = req.body.location;
		let restaurant = req.body.restaurant;

		const group = new Group({
			title,
			description,
			capacity,
			budget,
			dress_code,
			date,
			time,
			cuisine,
			user: req.locals.user,
			location,
			restaurant,
		});
		group
			.save() // Saving it in collection
			.then((result) => {
				console.log(result);
			})
			.catch((err) => console.log(err));
	} else {
		console.log("user not found");
	}
});

module.exports = router;
