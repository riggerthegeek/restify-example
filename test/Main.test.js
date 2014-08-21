/**
* Main
*/

"use strict";


/**
* Root Require
*
* This is a convenience method that prefixes the require
* path with the root path so as to help calling the
* correct file.
*
* @param {string} file
* @returns {*}
*/
function rootRequire(file) {
    return require(require("path").join(process.cwd(), file));
}


/* Node modules */
var EventEmitter = require("events").EventEmitter;


/* Third-party modules */
var chai = require("chai");
var proxyquire = require("proxyquire");
var sinon = require("sinon");

var steeplejack = require("steeplejack");


/* Files */
var config = rootRequire("./config");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Main test", function () {

    var Main,
        RestifyInst,
        RestifyStub;
    beforeEach(function () {

        RestifyInst = {
            acceptParserStrict: sinon.stub(),
            addRoutes: sinon.spy(),
            bodyParser: sinon.stub(),
            gzipResponse: sinon.stub(),
            on: sinon.stub(),
            outputHandler: sinon.stub(),
            queryParser: sinon.stub(),
            start: sinon.stub(),
            uncaughtException: sinon.stub()
        };

        RestifyInst.acceptParserStrict
            .returns(RestifyInst);

        RestifyInst.bodyParser
            .returns(RestifyInst);

        RestifyInst.gzipResponse
            .returns(RestifyInst);

        RestifyInst.queryParser
            .returns(RestifyInst);

        RestifyInst.uncaughtException
            .returns(RestifyInst);

        RestifyStub = function () {
            return RestifyInst;
        };

        Main = proxyquire("../src/Main", {
            "./service/library/Restify": RestifyStub
        });
    });

    describe("Instantiation test", function () {

        it("should expose a steeplejack instance", function (done) {

            RestifyInst.start
                .yieldsAsync(null);

            var obj = new Main(config)
                .on("config", function (serverConfig) {

                expect(serverConfig).to.be.an("object");
                expect(serverConfig).to.be.equal(config);

                done();

            });

            expect(obj).to.be.instanceof(steeplejack.Base)
                .to.be.instanceof(EventEmitter);

        });

        it("should throw an error if an error returned by the server start", function () {

            var error = new Error("Some error");

            RestifyInst.start
                .yields(error);

            var fail = false;
            try {
                var obj = new Main(config);
            } catch (err) {
                fail = true;
                expect(err).to.be.equal(error);
            } finally {
                expect(fail).to.be.true;
            }

        });

    });

});


