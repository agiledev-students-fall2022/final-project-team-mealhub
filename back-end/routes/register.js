const express = require('express')
const app = express()
var path = require('path');
const bcrypt = require('bcrypt')

const users=[]

// app.use(express.urlencoded({extended: false})) 






// //Make a get method for register.js
// app.get('/', (req, res) => {
//     //sendFile register.js from front-end
//     res.sendFile(path.join(__dirname, '../front-end/register.js'))
// })

// //Make a post method to get data from register.js
// app.post('/', async (req, res) => {
//     try {
//         //get data from form
//         const {email, password} = req.body
//         //hash password
//         const hashedPassword = await bcrypt.hash(password, 10)
//         //add user to users array
//         users.push({
//             id: Date.now().toString(),
//             email,
//             password: hashedPassword
//         })
//         res.sendFile(path.join(__dirname, '../front-end/login.js'))
//     } catch {
//         res.sendFile(path.join(__dirname, '../front-end/register.js'))
//     }
//     console.log(users)
// })
