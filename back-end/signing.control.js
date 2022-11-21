const express = require('express')
const router = express.Router()
var path = require('path');
const mongoose = require('mongoose');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./models/User");

//connect mongoose


router.use(express.urlencoded({extended: false}))
router.use(express.json())

mongoose.connect('mongodb+srv://mealhub12345:mealhub12345@cluster0.rx68d3c.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

exports.signup = async (req, res) => {
    //get data from form
    const {email, password,firstname, lastname, confirmPassword} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        email,
        password: hashedPassword,
        displayName: firstname + lastname,
        firstname,
        lastname,
        confirmPassword
    })

    if(emailIsValid(email))
    {
        try{
            await user.save()
            res.send({ message: "User registered successfully!" });
        }
        catch{
            res.status(500).send()
        }
    }
}

exports.signin = async (req, res) => {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      const passwordIsValid = bcrypt.compare(
        req.body.password,
        user.password
      );
  
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }
    
    //create a token
    const token = jwt.sign({id: user.userId}, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
    })


    res.status(200).send({ 
        id: user._id,
        email: user.email,
        accessToken: token
    });
};

exports.signout = async (req, res) => {
    try{
        req.session = null;
        return res.status(200).send({message: "You've been successfully signed out!"});
    }
    catch{
        res.status(500).send();
    }
};





