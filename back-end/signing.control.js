const express = require("express");
const router = express.Router();
var path = require("path");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const { check, validationResult } = require("express-validator");

//connect mongoose

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

mongoose.connect(
	"mongodb+srv://mealhub12345:mealhub12345@cluster0.rx68d3c.mongodb.net/?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

function emailIsValid(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.signup =
	// [
	//   check("email", "Please enter a valid email").isEmail(),
	//   check("password", "Please enter a password with 4 or more characters").isLength({ min: 4 }),
	//   check("firstname", "Please enter an alphabetic name").isAlpha().not().isEmpty(),
	//   check("lastname","Please enter an alphabetic name").isAlpha().not().isEmpty(),
	// ],

	async (req, res) => {
		//get data from form

		let email = req.body.email;
		let password = req.body.password;
		let firstName = req.body.firstname;
		let lastName = req.body.lastname;
		let displayName = firstName + " " + lastName;

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			email,
			password: hashedPassword,
			displayName,
			firstName,
			lastName,
			//confirmPassword
		});

		if (emailIsValid(email)) {
			try {
				// await user.save()
				user
					.save() // Saving it in collection
					.then((result) => {})
					.catch((err) => console.log(err));

				//create jwt token for user and redirect to root
				const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
					expiresIn: 60 * 60 * 24, // expires in 24 hours
				});
				res.setHeader(
					"Access-Control-Allow-Origin",
					`${process.env.HEADER_URL}`
				);
				res.cookie("jwt-token", token, {
					httpOnly: true,
					maxAge: 60 * 60 * 24 * 1000,
				});
				res.send({ token, user });
			} catch {
				res.status(500).send();
			}
		}
	};

exports.signin = async (req, res) => {
	console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, user) {
		//res.send("token")
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		if (user) {
			bcrypt.compare(req.body.password, user.password, function (err, result) {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				if (result) {
					const token = jwt.sign(
						{ email: user.email },
						process.env.JWT_SECRET,
						{
							expiresIn: 60 * 60 * 24, // expires in 24 hours
						}
					);
					res.setHeader(
						"Access-Control-Allow-Origin",
						"Access-Control-Allow-HEADERS".
						`${process.env.HEADER_URL}`
					);
					
					res.cookie("jwt-token", token, {
						httpOnly: true,
						maxAge: 60 * 60 * 24 * 1000,
					});
					res.send({ token, user });
				} else {
					res.status(403).send({ message: "Incorrect password!" });
					return;
				}
			});
		} else {
			res.status(405).send({ message: "User not found!" });
			return;
		}
	});
};

exports.verify = async (req, res) => {
	const token = req.cookies["jwt-token"];

	if (!token) {
		return res.status(401).send({ message: "No token provided!" });
	} else {
		return res.status(200).send({ message: "Success!" });
	}
};

exports.signout = async (req, res) => {
	try {
		console.log("signing out");
		req.session = null;
		//clear all cookies
		res.clearCookie("jwt-token");
		return res
			.status(200)
			.send({ message: "You've been successfully signed out!" });
	} catch {
		res.status(500).send();
	}
};
