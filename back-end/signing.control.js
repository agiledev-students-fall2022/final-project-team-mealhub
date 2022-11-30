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
  console.log("signup");
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
  console.log(user);

  if (emailIsValid(email)) {
    try {
      console.log("User registered successfully!");
      // await user.save()
      user
        .save() // Saving it in collection
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err));

        //create jwt token for user and redirect to root
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
            });
            res.setHeader('Access-Control-Allow-Origin', `${process.env.HEADER_URL}`);
            res.cookie('jwt-token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000});
            res.send({token})

            console.log(req.cookies)
    } catch {
      console.log("User not registered");
      res.status(500).send();
    }
  }
};


exports.signin = async (req, res) => {
  User.findOne({email: req.body.email}, function(err,user)
  {
    console.log("here")
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
          console.log(user.email)
           const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
            });
            console.log(token)
            res.setHeader('Access-Control-Allow-Origin', `${process.env.HEADER_URL}`);
            res.cookie('jwt-token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000});
            res.send({token})

            //decode jwt token
            console.log(req.cookies['jwt-token'])
            const decoded = jwt.verify(req.cookies['jwt-token'], process.env.JWT_SECRET);
            //read token from req.cookies
            console.log(decoded)
            
            

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

//   if (!user) {
//     return res.status(404).send({ message: "User Not found." });
//   }

//   const passwordIsValid = bcrypt.compare(
//     req.body.password,
//     user.password,
//     (err, res) => {
//       console.log("Compared result", req.body.password, user.password);
//     }
//   );

//   if (!passwordIsValid) {
//     return res.status(407).send({
//       message: "Invalid Password!",
//     });
//   }

//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//     expiresIn: 60 * 60 * 24 // expires in 24 hours
//   });

//   res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 });
//   res.redirect('/');
//   console.log(token)
// };

//   const passwordIsValid = bcrypt.compare(req.body.password,user.password , (err, res) {
//     if (err){
//         return res.status(401).send({
//             accessToken: null,
//             message: "Invalid Password!"
//           });
//         }
//     }
//     if (res) {
//         const token = jwt.sign({ id: user.id }, config.secret, {
//             expiresIn: 86400 // 24 hours
//           });

//           res.status(200).send({
//             id: user.id,
//             email: user.email,
//             accessToken: token
//           });
//     } });

//create a token

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res
      .status(200)
      .send({ message: "You've been successfully signed out!" });
  } catch {
    res.status(500).send();
  }
};
