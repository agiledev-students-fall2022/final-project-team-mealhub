const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

// Load User model
const User = require('../models/User')

router.post('/login', passport.authenticate('local'), (res,req) => {
    res.send(200)
    });


module.exports = router


