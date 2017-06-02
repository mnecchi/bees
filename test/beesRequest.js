var beesRequest = require('../umd/bees-request');
var { expect } = require('chai'); 
var sinon = require('sinon');

describe("bees request handler", function() {
    describe("static class", function() {       
        it("has a valid handler", function() {
            var handler = beesRequest.getHttpHandler();
            expect(handler).not.to.be.null;
        });
        it("has fetch method", function() {
            expect(beesRequest.fetch).to.be.a("function");
        });       
        it("has get method", function() {
            expect(beesRequest.get).to.be.a("function");
        });       
        it("has post method", function() {
            expect(beesRequest.post).to.be.a("function");
        });
    });

    describe("fetch", function() {
        it("returns error for invalid url", function(done) {
            var url = "";
            beesRequest.fetch(url)
                .then(function(response) {
                    expect(response).to.be.undefined;
                    done();
                })
                .catch(function(error) {
                    try {
                        expect(error).to.be.not.undefined;
                        expect(error.code).equals("ERR_ASSERTION");
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
        });

        it("returns not found error for non exisiting url", function(done) {
            var url = "http://aaaaaa";
            beesRequest.fetch(url)
                .then(function(response) {
                    expect(response).to.be.undefined;
                    done();
                })
                .catch(function(error) {
                    try {
                        expect(error).to.be.not.undefined;
                        expect(error.code).equals("ENOTFOUND");
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
        });

        it("returns connection error for non responding url", function(done) {
            var url = "http://localhost";
            beesRequest.fetch(url)
                .then(function(response) {
                    expect(response).to.be.undefined;
                    done();
                })
                .catch(function(error) {
                    try {
                        expect(error).to.be.not.undefined;
                        expect(error.code).equals("ECONNREFUSED");
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
        });

        it("(url, options) calls doFetch with the right options", function() {
            var doFetchStub = sinon.stub(beesRequest, "doFetch").callsFake(function(options) { return options; });
            var result = beesRequest.fetch("http://example.com", { data: "OK" });

            expect(result.url).equals("http://example.com");
            expect(result.data).equals("OK");   
            expect(result.callback).to.be.undefined;   

            doFetchStub.restore();     
        });

        it("(url, options, callback) calls doFetch with the right options", function() {
            var doFetchStub = sinon.stub(beesRequest, "doFetch").callsFake(function(options) { return options; });
            var result = beesRequest.fetch("http://example.com", { data: "OK" }, function(request) { return "OK"; });

            expect(result.url).equals("http://example.com");
            expect(result.data).equals("OK");
            expect(result.callback()).equals("OK");    
            
            doFetchStub.restore();             
        });
    });
});

