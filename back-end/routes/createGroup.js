const express = require("express");
const router = express.Router();
const axios = require("axios");
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const mongoose = require("mongoose");
const Group = require("../models/Group");

mongoose.connect('mongodb+srv://mealhub12345:mealhub12345@cluster0.rx68d3c.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// router.use(cors());
router.use(cors());
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
    "Origin, X-Requested-with, Content_Type,Accept,Authorization",
    "http://localhost:3001"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

const groupData = [];

router.use(express.json());
router.post("/", (req, res) => {
  
  groupData.push(req.body);
  res.send({ groupData });

  let title = req.body.restaurant;
  let description = req.body.description;
  let capacity = req.body.attendees;
  let budget = req.body.budgetDollar;
  let dress_code = req.body.dress;
  let date = req.body.date;
  let time = req.body.time;
  let cuisine = req.body.cuisine.toLowerCase();
  // let user = req.body.user;
  let location = req.body.location;

  const group = new Group({
    title,
    description,
    capacity,
    budget,
    dress_code,
    date,
    time,
    cuisine,
    // user,
    location,

  }
  );
  group.save()
    .then(result => {
      console.log(result);
    }
    )
    .catch(err => console.log(err));



});

// router.post("/", (req, res) => {
//   const groupData = [];
//   groupData.push(req.body);
//   res.send({groupData});

//   let title = req.body.restaurant
//   let description = req.body.description;
//   let capacity = req.body.attendees;
//   let budget = req.body.budgetDollar;
//   let dress_code = req.body.dress;
//   let date = req.body.date;

//   let time = req.body.time;
//   let cuisine = req.body.cuisine.toLowerCase();
//   // let user = req.body.user;
//   let location = req.body.location

//   // Send group Data to MongoDB URL collection
//   axios
//     .post(MONGO_URI, {
//       title,
//       description,
//       capacity,
//       budget,
//       dress_code,
//       date,
//       time,
//       cuisine,
//       location
//     })
//     .then((response) => {
//       console.log(response);
//     }
//     )
//     .catch((error) => {
//       console.log(error);
//     }
//     );
// });

module.exports = router;
