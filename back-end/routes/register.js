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
        const {email, password,firstname, lastname, confirmPassword} = req.body
        // const email = req.body.email
        // const password = req.body.password
        // const firstname = req.body.firstname
        // const lastname = req.body.lastname
        // const confirmPassword = req.body.confirmPassword
    
        //hash password

        const hashedPassword = await bcrypt.hash(password, 10)

        if(emailIsValid(email))
        {
        users.push({
            id: Date.now().toString(),
            email,
            password: hashedPassword,
            firstname,
            lastname,
            confirmPassword
        })
        res.send({users})
        }
        console.log(users)
})

module.exports = router
