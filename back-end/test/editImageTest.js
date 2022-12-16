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

const invalid_token = "hi";
const invalid_id_token = jwt.sign({ id: "abcd" }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
});
//=============================================================

describe("TEST API- editImage", function () {
    /**
     * Test the POST route for uploadImage
     */
    this.timeout(10000);
    describe("POST request to /uploadImage", () => {
        it("It should POST image to editImage", (done) => {
            const f = "test/pecanpietest.jpg";
            chai.request(server)
                .post("/uploadImage")
                .set("content-type", "multipart/form-data")
                .set("Cookie", `jwt-token=${token}`)
                .attach("image", f)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("status").equals("success");
                    res.body.should.have
                        .property("message")
                        .equals("The files were uploaded!!!");
                    res.body.should.have.property("files");
                    done();
                });
        });
        it("It should fail to POST image to editImage with invalid id", (done) => {
            const f = "test/pecanpietest.jpg";
            chai.request(server)
                .post("/uploadImage")
                .set("content-type", "multipart/form-data")
                .set("Cookie", `jwt-token=${invalid_id_token}`)
                .attach("image", f)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("success");
                    res.body.should.have.property("success").equals(false);

                    done();
                });
        });

        it("It should fail to POST image to editImage with invalid token", (done) => {
            const f = "test/pecanpietest.jpg";
            chai.request(server)
                .post("/uploadImage")
                .set("content-type", "multipart/form-data")
                .set("Cookie", `jwt-token=${invalid_token}`)
                .attach("image", f)
                .end((err, res) => {
                    res.should.be.a("object");
                    res.body.should.have.property("success");
                    res.body.should.have.property("success").equals(false);

                    done();
                });
        });
    });
});
