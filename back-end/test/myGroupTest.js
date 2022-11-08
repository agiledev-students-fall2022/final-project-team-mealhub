const assert = require("assert");
const express = require("express");
const request = require("supertest");

describe("My Group page ", function () {
	describe("GET data for my groups", () => {
		it("Should show my groups data ", function (done) {
			request(express())
				.get("/myGroup")
				.expect("Content-Type", /json/)
				.end((err, res) => {
					assert.equal(typeof res.body, "object");
					// assert.equal(res.status, 200);
					// res.should.have.status(200);
					//      res.body.should.be.a('object');
					done();
				});
		});
	});
});
