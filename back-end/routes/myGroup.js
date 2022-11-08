const express = require("express");
const router = express.Router();
const axios = require("axios");

// Getting data at my group
router.get("/", async (req, res) => {
  try {
    // requesting resource
    // Filter data here based on group ID in the signed in user and filtering the cards on this page based on the result
    // TO be implemented in the next spirnt with the database

    const response = await axios.get(
      "https://my.api.mockaroo.com/mealhub.json?key=533f5110"
    );
    res.json(response.data);
  } catch (err) {
    res.json({
      success: false,
    });
  }
});

module.exports = router;
