const { verifySignUp } = require("../middleware_auth");
const controller = require("../signing.control.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/register",
        [verifySignUp.checkDuplicateEmail],
        controller.signup
    );

    app.post("/login", controller.signin);

    app.get("/logout", controller.signout);
};
