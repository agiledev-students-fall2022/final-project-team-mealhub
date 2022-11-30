const express = require("express");

const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser());
const User = require("../models/User");

const { checkUser } = require("../middleware_auth/jwt_auth");

//----------------------Fetch profile page api data-----------------------------------

router.get("/profilePage", checkUser, async (req, res) => {
    try {
        // requesting resource from DB
        const userInfo = await User.findById(res.locals.user.id);
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
