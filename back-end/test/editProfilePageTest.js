const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

//Assertion style
chai.should();
chai.use(chaiHttp);
const jwt = require("jsonwebtoken");
//=============================================================
const token = jwt.sign(
    { email: "applepie@gmail.com" },
    process.env.JWT_SECRET,
    {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
    }
);

//=============================================================

describe("TEST API- editProfilePage", () => {
    /**
     * Test the POST route for editProfilePage
     */

    describe("POST request to /editInfo", () => {
        it("It should POST changes to user profile", (done) => {
            const change = {
                displayName: "Pie",
            };
            chai.request(server)
                .post("/editInfo")
                .send(change)
                .set("Cookie", `jwt-token=${token}`)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("status").equals("success!");
                    res.body.should.have
                        .property("your_data")
                        .that.includes.all.key(["displayName"]);
                    res.body.should.have.nested
                        .property("your_data.displayName")
                        .not.equal("");

                    done();
                });
        });
    });
});
