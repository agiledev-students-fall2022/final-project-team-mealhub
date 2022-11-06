const express = require("express");
const router = express.Router();
const axios = require("axios");
const { check, validationResult } = require("express-validator");
const cors = require('cors');

// router.use(cors());
router.use(cors());
router.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','http://localhost:8080');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

const url = "http://localhost:8080/createGroup";
const groupData= [];

router.use(express.json())

router.post('/', (req, res) => {
    console.log(req.body); 
    groupData.push(req.body);
    res.json({ response: 'Data recieved by the Server' });
});



// router.post(
//     "/",
//     [
//         check("groupName", "Please enter a group name").not().isEmpty(),
//         check("groupDescription", "Please enter a group description").not().isEmpty(),
//         check("groupLocation", "Please enter a group location").not().isEmpty(),
//         check("groupCuisine", "Please enter a group cuisine").not().isEmpty(),
//         check("groupDate", "Please enter a group date").not().isEmpty(),
//         check("groupTime", "Please enter a group time").not().isEmpty(),
//         check("groupSize", "Please enter a group size").not().isEmpty(),
//         check("groupPrice", "Please enter a group price").not().isEmpty(),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { groupName, groupDescription, groupLocation, groupCuisine, groupDate, groupTime, groupSize, groupPrice } = req.body;
//         try {
//             const group = {
//                 groupName,
//                 groupDescription,
//                 groupLocation,


//                 groupCuisine,
//                 groupDate,
//                 groupTime,
//                 groupSize,
//                 groupPrice,
//             };
//             groupData.push(group);
//             res.json(groupData);
//             console.log(groupData);
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             };
//             const body = JSON.stringify(group);

//             const response = await axios.post(url, body, config);
//             console.log(response.data);
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send("Server error");
//         }
//     }
// );


// axios.get(url)
//   .then((response) => {
//     // what ever you want to do with your response

//     console.log(response.data);
//     // console.log(response)
//   }).catch(error => console.log(error))


// console.log(groupData)


// router.post(
//     "/",
//     [
//         check("name", "Please enter a name").not().isEmpty(),
//         check("email", "Please enter a valid email").isEmail(),
//         check("age", "Please enter a valid age").isNumeric(),
//         check("location", "Please enter a valid location").not().isEmpty(),
//         check("cuisinePreferences", "Please enter a valid cuisine preference").not().isEmpty(),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const { name, email, age, location, cuisinePreferences } = req.body;
//         try {
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             };
//             const body = JSON.stringify({
//                 name,
//                 email,
//                 age,

//                 location,
//                 cuisinePreferences,
//             });
//             const response = await axios.post(  
//                 "http://localhost:8080/createGroup",
//                 body,
//                 config
//             );
//             res.json(response.data);
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send("Server error");
//         }
//     }
// );


// 
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


// router.post(
//     "/group",
//     [
//         check("groupName", "Group name is required").not().isEmpty(),
//         check("groupDescription", "Group description is required").not().isEmpty(),
//         check("groupLocation", "Group location is required").not().isEmpty(),
//         check("groupCuisine", "Group cuisine is required").not().isEmpty(),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const { groupName, groupDescription, groupLocation, groupCuisine } = req.body;
//         try {
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             };
//             console.log("hsdas")
//             const body = JSON.stringify({
//                 groupName,
//                 groupDescription,
//                 groupLocation,
//                 groupCuisine,
//             });
//             const response = await axios.post("http://localhost:8080/newGroup", body, config);
//             console.log(response.data)
//             newGroup.push(response.data);
//             res.redirect("/createGroup");
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send("Server error");
//         }
//     }
    
// );

module.exports = router;
