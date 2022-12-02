const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser());
const User = require("../models/User");

const { checkUser } = require("../middleware_auth/jwt_auth");

const { body, validationResult } = require("express-validator");

router.post(
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
                console.log(res.locals.user._id);
                await User.findByIdAndUpdate(res.locals.user._id, {
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
);

module.exports = router;
