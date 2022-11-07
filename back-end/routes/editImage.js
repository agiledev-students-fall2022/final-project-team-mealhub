const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

// route for HTTP POST requests for /upload-example
router.post("/uploadImage", upload.single("image"), (req, res, next) => {
    // check whether anything was uploaded
    if (req.file) {
        // success! send data back to the client, e.g. some JSON data
        const data = {
            status: "success",
            message: "The files were uploaded!!!",
            files: req.file,
        };
        res.json(data); // send respose
    }
});

module.exports = router;
