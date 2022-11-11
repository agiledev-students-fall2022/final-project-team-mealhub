const express = require('express')
const router = express.Router()
var path = require('path');
const bcrypt = require('bcrypt');
const users=[]

router.use(express.urlencoded({extended: false}))
router.use(express.json())

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

//Make a post method to get data from register.js
router.post('/', async (req, res) => {
        //get data from form
        const {email, password} = req.body
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        //add user to users array
       // if(check(req.body.email).isEmail())
        //{
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
})

module.exports = router
