const express = require("express");

const router = express.Router();

const User = require("../models/User");

const passport = require("passport");

router.use(passport.initialize());

//const { jwtOptions, jwtStrategy } = require("../jwt-config.js"); // import setup options for using JWT in passport
//passport.use(jwtStrategy);

const { body, validationResult } = require("express-validator");

router.post(
    "/editInfo",
    body("displayName")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Must be at least 1 character long")
        .isAlpha()
        .withMessage("Must be alphabetic"),
    body("firstName")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Must be at least 1 character long")
        .isAlpha()
        .withMessage("Must be alphabetic"),
    body("lastName")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Must be at least 1 character long")
        .isAlpha()
        .withMessage("Must be alphabetic"),
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            // requesting resource from DB
            const userInfo = await User.findOne(req.user.id);
            const dataRecieved = {
                status: "success!",
                your_data: {
                    displayName: req.body.displayName.trim(),
                    firstName: req.body.firstName.trim(),
                    lastName: req.body.lastName.trim(),
                },
            };
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                const userInfo = await User.findByIdAndUpdate(req.user.id, {
                    displayName: req.body.displayName.trim(),
                    firstName: req.body.firstName.trim(),
                    lastName: req.body.lastName.trim(),
                });
                res.json(dataRecieved);
            }
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
            });
        }
    }
);

module.exports = router;
