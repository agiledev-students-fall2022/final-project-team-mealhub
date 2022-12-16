const assert = require("assert");
const express = require("express");
const request = require("supertest");

describe("Search", function () {
    describe('GET /search', function(){
        it('should search in database using query params', function(done){
		    request(express())
                .get('/search')
                .query({search: 'test'})
                .expect(200)
                .expect("Content-Type", /json/)
				.end((err, res) => {
					assert.equal(typeof res.body, "object");
					done();
				});
        });
    });
});