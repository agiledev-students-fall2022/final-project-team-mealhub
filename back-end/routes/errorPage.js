// Error page route to handle all 404 request
const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser());
const multer = require("multer");


app.use((req, res, next) => {
    res.status(404).render("errorPage");
    }
);

