const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser());
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User");

const { checkUser } = require("../middleware_auth/jwt_auth");

const upload = multer({
    storage: multer.diskStorage({}),
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("Unsupported file type!"), false);
            return;
        }
        cb(null, true);
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
            //-------------------------------------
            try {
                // Upload image to cloudinary
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "mealHubProfileImages",
                    use_filename: true,
                });
                // Update Image in mongodb
                await User.findByIdAndUpdate(res.locals.user._id, {
                    image: result.secure_url,
                });
                res.json(data); // send response
            } catch (err) {
                res.json({
                    success: false,
                });
            }
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
