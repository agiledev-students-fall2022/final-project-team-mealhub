const express = require('express')
const router = express.Router()
var path = require('path');
const bcrypt = require('bcrypt')

const users=[]
console.log("hello")

//Make a post method to get data from login.js form
router.post('/', async (req, res) => {
    //get data from form
    const {email, password} = req.body
    //check if user exists
    const user = users.find(user => user.email === email)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        //check if password is correct
        if (await bcrypt.compare(password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }

    console.log(users)
})

module.exports = router
