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
const cloudinary = require("cloudinary");

router.use(cookies());

// creating a default dict class for
class DefaultDict {
	constructor(defaultInit) {
		return new Proxy(
			{},
			{
				get: (target, name) =>
					name in target
						? target[name]
						: (target[name] =
								typeof defaultInit === "function"
									? new defaultInit().valueOf()
									: defaultInit),
			}
		);
	}
}

// fetching data from cloudinary
const cuisineImages = new DefaultDict(Array);
const getImages = async () => {
	await cloudinary.v2.search
		.max_results(1000)
		// .resources({
		// 	folder: "MealHub",
		// 	max_results: 100000,
		// 	width: 400,
		// 	height: 120,
		// 	crop: "scale",
		// })
		.execute("folder=MealHub/*")
		.then((result) => {
			result["resources"].forEach((element) => {
				if (element["folder"].includes("MealHub")) {
					cuisineImages[element["folder"]].push(element["url"]);
				}
			});
		});
};
getImages();

// @route   POST api/groups
mongoose.connect(
	"mongodb+srv://mealhub12345:mealhub12345@cluster0.rx68d3c.mongodb.net/?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// const corsOptions = {
// 	credentials: true,
// 	origin: "http://localhost:3000",
// 	optionsSuccessStatus: 200,
// };

// router.use(cors(corsOptions));

// router.use((req, res, next) => {
// 	res.header(
// 		"Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
// 		"Origin, X-Requested-with, Content_Type,Accept,Authorization",
// 		"Access-Control-Allow-Credentials"
// 	);
// 	if (req.method === "OPTIONS") {
// 		res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
// 		return res.status(200).json({});
// 	}
// 	next();
// });

router.use(express.json());

router.post(
	"/",
	[
		check("name", "Please enter a name").not().isEmpty(),
		check("description", "Please enter a description").not().isEmpty(),
		check("email", "Your email is not valid").not().isEmpty(),
		check("email", "Your email is not valid").isEmail(),
		// check("members", "Please enter members").not().isEmpty(),
	],

	checkUser,
	async (req, res) => {
		if (res.locals.user !== null) {
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
			let image;

			// adding the cuisine image to the

			// adding cuisine cuisineImages
			if (cuisine == "korean") {
				image =
					cuisineImages["MealHub/korean"][
						Math.floor(Math.random() * cuisineImages["MealHub/korean"].length)
					];
			} else if (cuisine == "american") {
				image =
					cuisineImages["MealHub/american"][
						Math.floor(Math.random() * cuisineImages["MealHub/korean"].length)
					];
			} else if (cuisine == "indian") {
				image =
					cuisineImages["MealHub/indian"][
						Math.floor(Math.random() * cuisineImages["MealHub/korean"].length)
					];
			} else if (cuisine == "italian") {
				image =
					cuisineImages["MealHub/italian"][
						Math.floor(Math.random() * cuisineImages["MealHub/korean"].length)
					];
			} else if (cuisine == "chinese") {
				image =
					cuisineImages["MealHub/chinese"][
						Math.floor(Math.random() * cuisineImages["MealHub/korean"].length)
					];
			} else if (cuisine == "mediterranean") {
				image =
					cuisineImages["MealHub/mediterranean"][
						Math.floor(Math.random() * cuisineImages["MealHub/korean"].length)
					];
			} else if (cuisine == "japanese") {
				image =
					cuisineImages["MealHub/japanese"][
						Math.floor(Math.random() * cuisineImages["MealHub/korean"].length)
					];
			}

			console.log("image: ", image);
			let location = req.body.location;
			let restaurant = req.body.restaurant;

			const group = new Group({
				title,
				description,
				capacity,
				budget,
				dress_code,
				date,
				image,
				members: [res.locals.user],
				time,
				cuisine,
				user: res.locals.user,
				location,
				restaurant,
			});
			group
				.save() // Saving it in collection
				.then((result) => {
					console.log(result);
					res.status(200).json({
						message: "Group Created",
						group: result,
					});
				})
				.catch((err) => console.log(err));
		} else {
			console.log("user not found");
			return res.status(400).send("user not found");
		}
	}
);

module.exports = router;
