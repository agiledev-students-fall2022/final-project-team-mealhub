const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser());
const multer = require("multer");

const User = require("../models/User");

const { checkUser } = require("../middleware_auth/jwt_auth");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "../front-end/public/uploads");
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
    checkUser,
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
                await User.findByIdAndUpdate(res.locals.user._id, {
                    image: "/uploads/" + req.file.filename,
                });
            } catch (err) {
                res.json({
                    success: false,
                });
            }

            res.json(data); // send response
        } else {
            try {
                await User.findByIdAndUpdate(res.locals.user._id, {
                    image: "/uploads/defaultProfilePic.png",
                });
            } catch (err) {
                res.json({
                    success: false,
                });
            }
        }
    }
);

module.exports = router;
