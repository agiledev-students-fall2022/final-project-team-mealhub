const express = require('express')
const router = express.Router()
var path = require('path');
const bcrypt = require('bcrypt');
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../models/User");
const passport = require('passport');


// @route   POST api/groups
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
        //const {email, password,firstName, lastName, confirmPassword} = req.body
        const email = req.body.email
        const password = req.body.password
        const firstName = req.body.firstname
        const lastName = req.body.lastname
        const confirmPassword = req.body.confirmPassword
    
        //hash password

        const hashedPassword = await bcrypt.hash(password, 10)

        if(emailIsValid(email))
        {
          const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            displayName: firstName + " " +lastName,
          });
          //console.log(user)
          let _id = user._id
          user.save()
          .then( result => {
            // res.status(201).json({
            //   message: "User created!",
            //   result: result
            // } );
            //get user ID fromthe database and create login session with passport
            req.login(_id, function(err)
            {
              console.log("User ID: " + _id)
              if(err)
                console.log(err)
              else
              {
                return res.redirect('/')}
            })
            }
            )
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          }
          );
        }
        //console.log(user)
})

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});



module.exports = router
