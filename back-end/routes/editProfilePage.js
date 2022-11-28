const express = require("express");

const router = express.Router();

const User = require("../models/User");

//const { checkUser } = require("../middleware_auth/jwt_auth");

const { body, validationResult } = require("express-validator");

//CODE FOR WHEN AUTHENTICATION IS SET
/*router.post(
    "/editInfo",
    checkUser,
    body("displayName")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Must be at least 1 character long"),

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
                    },
                };
                await User.findByIdAndUpdate(req.user.id, {
                    displayName: req.body.displayName.trim(),
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
);*/

router.post(
    "/editInfo",
    body("displayName")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Must be at least 1 character long"),
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
                    },
                };
                await User.findOneAndUpdate(
                    { firstName: "Hello" },
                    {
                        displayName: req.body.displayName.trim(),
                    }
                );
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
