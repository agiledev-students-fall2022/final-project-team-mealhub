const express = require('express')
const router = express.Router()
var path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');


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

//Make a post method to get data from register.js
router.post('/', async (req, res) => {
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
})

module.exports = router
