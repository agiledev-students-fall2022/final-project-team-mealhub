const express = require("express");
const router = express.Router();
var path = require("path");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./models/User");




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

exports.signup = async (req, res) => {
  //get data from form
    
    let email = req.body.email
    let password = req.body.password
    let firstName = req.body.firstname
    let lastName = req.body.lastname
    let displayName = firstName +" "+ lastName


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
        .then((result) => {

        })
        .catch((err) => console.log(err));

        //create jwt token for user and redirect to root
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
            });
            res.setHeader('Access-Control-Allow-Origin', `${process.env.HEADER_URL}`);
            res.cookie('jwt-token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000});
            res.send({token})
    } catch {
      res.status(500).send();
    }
  }
};


exports.signin = async (req, res) => {
  User.findOne({email: req.body.email}, function(err,user)
  {
    //res.send("token")
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (result) {
           const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
            });
            res.setHeader('Access-Control-Allow-Origin', `${process.env.HEADER_URL}`);
            res.cookie("jwt-token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000});
            res.send({token})

        } else {
          res.status(400).send({ message: "Incorrect password!" });
          return;
        }
      });
    } else {
      res.status(400).send({ message: "User not found!" });
      return;
    }
  }
  )
};

exports.signout = async (req, res) => {
  try {
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
