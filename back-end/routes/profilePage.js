const express = require("express");

const router = express.Router();

const axios = require("axios");

const User = require("../models/User");

const passport = require("passport");

router.use(passport.initialize());

const { jwtOptions, jwtStrategy } = require("../jwt-config.js"); // import setup options for using JWT in passport
passport.use(jwtStrategy);

//----------------------Fetch profile page api data-----------------------------------

router.get(
    "/profilePage",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            // requesting resource from DB
            const userInfo = await User.findOne(req.user.id);
            res.json(userInfo); // pass data along directly to client
        } catch (err) {
            res.json({
                success: false,
            });
        }
    }
);

module.exports = router;
