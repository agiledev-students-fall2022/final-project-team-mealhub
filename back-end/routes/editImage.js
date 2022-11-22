const express = require("express");
const router = express.Router();
const multer = require("multer");

const User = require("../models/User");

const passport = require("passport");

router.use(passport.initialize());

//const { jwtOptions, jwtStrategy } = require("../jwt-config.js"); // import setup options for using JWT in passport
//passport.use(jwtStrategy);

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/uploads");
        },
        filename: function (req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}_${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            return cb(null, false);
        }
    },
});

// route for HTTP POST requests for /upload-example
router.post(
    "/uploadImage",
    passport.authenticate("jwt", { session: false }),
    upload.single("image"),
    async (req, res, next) => {
        // check whether anything was uploaded
        if (req.file) {
            // success! send data back to the client, e.g. some JSON data
            const data = {
                status: "success",
                message: "The files were uploaded!!!",
                files: req.file,
            };
            // requesting and updating resource from DB
            try {
                const userInfo = await User.findByIdAndUpdate(req.user.id, {
                    image: req.file.path,
                });
            } catch (err) {
                console.log("edit profile error ");
                res.json(err);
            }

            res.json(data); // send response
        }
    }
);

module.exports = router;
