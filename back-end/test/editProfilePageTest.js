const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("TEST API- editProfilePage", () => {
    /**
     * Test the POST route for editProfilePage
     */
    describe("POST request to /editInfo", () => {
        it("It should POST changes to user profile", (done) => {
            const change = {
                id: "2",
                name: "Bob",
                email: "bob@bob.com",
                age: "200",
                location: "new york",
                cuisinePreferences: "korean",
            };
            chai.request(server)
                .post("/editInfo")
                .send(change)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("status").equals("success!");
                    res.body.should.have
                        .property("your_data")
                        .that.includes.all.key([
                            "id",
                            "name",
                            "email",
                            "age",
                            "location",
                            "cuisinePreferences",
                        ]);
                    res.body.should.have.nested
                        .property("your_data.id")
                        .not.equal("");
                    res.body.should.have.nested
                        .property("your_data.name")
                        .not.equal("");
                    res.body.should.have.nested
                        .property("your_data.email")
                        .not.equal("");
                    res.body.should.have.nested
                        .property("your_data.age")
                        .not.equal("");
                    res.body.should.have.nested
                        .property("your_data.location")
                        .not.equal("");
                    res.body.should.have.nested
                        .property("your_data.cuisinePreferences")
                        .not.equal("");
                    done();
                });
        });
    });
});
