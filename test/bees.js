var bees = require('../src/bees.js');
var { expect } = require('chai'); 
var sinon = require('sinon');

describe("bees request handler", function() {
    describe("static class", function() {       
        it("has a valid handler", function() {
            var handler = bees.getHttpHandler();
            expect(handler).not.to.be.null;
        });
        it("has fetch method", function() {
            expect(bees.fetch).to.be.a("function");
        });       
        it("has get method", function() {
            expect(bees.get).to.be.a("function");
        });       
        it("has post method", function() {
            expect(bees.post).to.be.a("function");
        });
    });
});

