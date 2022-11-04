// import and instantiate express
const express = require("express");
const app = express();

//import useful middleware
const axios = require("axios");

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//----------------------Fetch profile page api data-----------------------------------
/*
WILL NEED TO USE PARAMETERS ONCE LOGIN IS FIXED
*/
app.get("/profilePage/:id", async (req, res, next) => {
  try {
    // insert the environmental variable into the URL we're requesting
    const response = await axios.get(
      `https://my.api.mockaroo.com/user_profiles.json?key=18bea250`
    );
    res.json(response.data[0]); // pass data along directly to client
  } catch (err) {
    res.json({
      success: false,
    });
  }
});

module.exports = app;
