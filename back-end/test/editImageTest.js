const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("TEST API- editImage", () => {
    /**
     * Test the POST route for uploadImage
     */
    describe("POST request to /uploadImage", () => {
        it("It should POST image to editImage", (done) => {
            const f = "test/dogTestPic.jpg";
            chai.request(server)
                .post("/uploadImage")
                .set("content-type", "multipart/form-data")
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
    });
});
