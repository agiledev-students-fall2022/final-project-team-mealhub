const express = require("express");

const router = express.Router();

const User = require("../models/User");

//CODE FOR WHEN AUTHENTICATION IS SET
/*const { checkUser } = require("../middleware_auth/jwt_auth");


//----------------------Fetch profile page api data-----------------------------------

router.get("/profilePage", checkUser, async (req, res) => {
    try {
        // requesting resource from DB
        const userInfo = await User.findById(req.user.id);
        res.json({
            displayName: userInfo.displayName,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
        }); // pass data along directly to client
    } catch (err) {
        res.json({
            success: false,
        });
    }
});
*/

router.get("/profilePage", async (req, res) => {
    try {
        // requesting resource from DB
        const userInfo = await User.findOne({ firstName: "Hello" });
        res.json({
            image: userInfo.image,
            displayName: userInfo.displayName,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
        }); // pass data along directly to client
    } catch (err) {
        res.json({
            success: false,
        });
    }
});

module.exports = router;
