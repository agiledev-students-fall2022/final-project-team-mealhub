const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("TEST API- profilePage", () => {
    /**
     * Test the GET route for profilePage
     */
    describe("GET request to /profilePage/:id", () => {
        it("It should GET all the user profile information by ID", (done) => {
            chai.request(server)
                .get("/profilePage/2")
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("profileImage");
                    res.body.should.have.property("id");
                    res.body.should.have.property("name");
                    res.body.should.have.property("email");
                    res.body.should.have.property("age");
                    res.body.should.have.property("location");
                    res.body.should.have.property("cuisinePreferences");
                    done();
                });
        });
    });
});
