const express = require("express");
const router = express.Router();
const axios = require("axios");
const { check, validationResult } = require("express-validator");
const cors = require("cors");

// router.use(cors());
router.use(cors());
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
    "Origin, X-Requested-with, Content_Type,Accept,Authorization",
    "http://localhost:8080"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

// const url = "http://localhost:8080/createGroup";
const groupData = [];

router.use(express.json());
router.post("/", (req, res) => {
  // console.log(req.body);
  groupData.push(req.body);
  res.send({groupData});
  // res.json({groupData});

  console.log(groupData);
});



// router.get('/', (req, res) => {
//     console.log(req.body);
//     res.json(groupData);
//     console.log("got data")

// });

// router.post("/group", [
//     check("groupName", "Group name is required").not().isEmpty(),
//     check("groupDescription", "Group description is required").not().isEmpty(),
//     check("groupCategory", "Group category is required").not().isEmpty(),
//     check("groupLocation", "Group location is required").not().isEmpty(),
//     check("groupSize", "Group size is required").not().isEmpty(),
//     check("groupDate", "Group date is required").not().isEmpty(),
//     check("groupTime", "Group time is required").not().isEmpty(),
//     check("groupDuration", "Group duration is required").not().isEmpty(),
//     check("groupPrice", "Group price is required").not().isEmpty(),

// ], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const { groupName, groupDescription, groupCategory, groupLocation, groupSize, groupDate, groupTime, groupDuration, groupPrice } = req.body;
//     const group = {
//         groupName,
//         groupDescription,
//         groupCategory,
//         groupLocation,
//         groupSize,
//         groupDate,
//         groupTime,
//         groupDuration,
//         groupPrice
//     }
//     // axios.post("---------MongoDB Database here------", group)
//     console.log(group)

//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//     res.redirect("/createGroup");
// });

module.exports = router;
