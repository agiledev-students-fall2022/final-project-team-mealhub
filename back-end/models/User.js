const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "/uploads/defaultProfilePic.png",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("User", UserSchema);
