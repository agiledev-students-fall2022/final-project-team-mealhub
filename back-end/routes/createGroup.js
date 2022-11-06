const express = require("express");

const router = express.Router();

const axios = require("axios");

const { check, validationResult } = require("express-validator");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get();

let newGroup = [];

router.post("/create", function (req, res) {
  const newBook = {
    BookID: req.body.bookID,
    Title: req.body.bookTitle,
    Author: req.body.bookAuthor,
  };
  newGroup.push(group);
  console.log(newGroup);
});

router.get("/home", function (req, res) {
  res.send(newGroup);
  console.log("Inside Home Login");
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  console.log("Books : ", JSON.stringify(newGroup));
  res.end(JSON.stringify(newGroup));
});

// router.get("/:id", async (req, res) => {
//     try {
//         // insert the environmental variable into the URL we're requesting
//         const response = await axios.get(
//             `https://my.api.mockaroo.com/user_profiles.json?key=18bea250`
//         );
//         res.json(response.data[0]); // pass data along directly to client
//     } catch (err) {
//         res.json({
//             success: false,
//         });
//     }
// });

module.exports = router;
