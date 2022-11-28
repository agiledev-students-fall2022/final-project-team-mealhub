const express = require("express");

const router = express.Router();

const User = require("../models/User");

const { checkUser } = require("../middleware_auth/jwt_auth");

const { body, validationResult } = require("express-validator");

router.post(
    "/editInfo",
    checkUser,
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

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                // requesting resource from DB
                const dataRecieved = {
                    status: "success!",
                    your_data: {
                        displayName: req.body.displayName.trim(),
                        firstName: req.body.firstName.trim(),
                        lastName: req.body.lastName.trim(),
                    },
                };
                await User.findByIdAndUpdate(req.user.id, {
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
