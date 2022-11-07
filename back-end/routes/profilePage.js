const express = require("express");

const router = express.Router();

const axios = require("axios");

//----------------------Fetch profile page api data-----------------------------------
/*
WILL NEED TO USE PARAMETERS ONCE LOGIN IS FIXED
*/
router.get("/:id", async (req, res) => {
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

module.exports = router;
