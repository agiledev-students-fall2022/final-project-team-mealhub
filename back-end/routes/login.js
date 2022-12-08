const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.use(express.urlencoded({extended: false}))
router.use(express.json())

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

//Make a post method to get data from register.js
router.post('/', async (req, res) => {
        const {email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        if(emailIsValid(email))
        {
        users.push({
            id: Date.now().toString(),
            email,
            password: hashedPassword
        })
        res.send({users})
        
        }
    console.log(users)
    console.log("Redirecting")
})

module.exports = router
