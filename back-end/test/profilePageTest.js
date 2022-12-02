const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Assertion style
chai.should();
chai.use(chaiHttp);

//=============================================================

const token = jwt.sign(
    { email: "applepie@gmail.com" },
    process.env.JWT_SECRET,
    {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
    }
);

const invalid_token = "hi";
const invalid_id_token = jwt.sign({ id: "abcd" }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
});
//=============================================================

describe("TEST API- profilePage", () => {
    describe("GET request to /profilePage", () => {
        it("It should GET all the user profile information by id", (done) => {
            chai.request(server)
                .get("/profilePage")
                .set("Cookie", `jwt-token=${token}`)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("image");
                    res.body.should.have.property("displayName");
                    res.body.should.have.property("firstName");
                    res.body.should.have.property("lastName");
                    res.body.should.have.property("email");
                    done();
                });
        });
    });
    describe("GET request to /profilePage", () => {
        it("It should not GET all the user profile information with invalid token", (done) => {
            chai.request(server)
                .get("/profilePage")
                .set("Cookie", `jwt-token=${invalid_token}`)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("success");
                    res.body.should.have.property("success").equals(false);

                    done();
                });
        });
    });
    describe("GET request to /profilePage", () => {
        it("It should not GET all the user profile information with invalid id", (done) => {
            chai.request(server)
                .get("/profilePage")
                .set("Cookie", `jwt-token=${invalid_id_token}`)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("success");
                    res.body.should.have.property("success").equals(false);

                    done();
                });
        });
    });
});
