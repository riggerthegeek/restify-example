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
var Errors = rootRequire("./src/error");
var UncaughtError = rootRequire("./src/error/Uncaught");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Main test", function () {

    var Main,
        RestifyInst,
        RestifyStub,
        BunyanInst,
        BunyanStub;
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

        BunyanInst = {
            debug: sinon.stub(),
            error: sinon.stub(),
            fatal: sinon.stub()
        };

        BunyanStub = function () {
            return BunyanInst;
        };

        Main = proxyquire("../../src/Main", {
            "./service/library/Restify": RestifyStub,
            "./service/library/Bunyan": BunyanStub
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

        it.skip("should use the outputHandler and publish to the server.outputHandler method", function (done) {

            var routes;

            var RouteStub = function (outputHandler) {
                return {
                    getRoutes: function () {
                        routes = {
                            "/example": {
                                get: function (req, res, cb) {

                                    var err = "err";
                                    var data = "data";
                                    outputHandler(err, data, req, res, cb);
                                }
                            }
                        };

                        return routes;
                    }

                };
            };

            console.log(RouteStub());
            process.exit();

            Main = proxyquire("../../src/Main", {
                "./service/routes": RouteStub,
                "./service/library/Restify": RestifyStub
            });

            RestifyInst.start
                .yieldsAsync(null);

            RestifyInst.outputHandler
                .yields(null);

            /* Create the server */
            var obj = new Main(config)
                .on("config", function () {

                    expect(RestifyInst.addRoutes).to.be.calledOnce
                        .calledWith(routes);

                    routes["/example"].get({}, {}, function () {

                        expect(RestifyInst.outputHandler).to.be.calledOnce
                            .calledWith("err", "data");

                        done();
                    });

                });

        });

        it("should handle an uncaught exception", function () {

            var uncaughtFn;
            RestifyInst.uncaughtException = function (fn) {
                uncaughtFn = fn;
            };

            RestifyInst.start
                .yieldsAsync(null);

            /* Create the server */
            var obj = new Main(config)
                .on("config", function () {

                    var err = new Error("Some error");

                    var req = {},
                        res = {};

                    uncaughtFn(req, res, null, err);

                    expect(BunyanInst.fatal).to.be.calledOnce
                        .calledWith(err);

                    expect(BunyanInst.debug).to.not.be.called;
                    expect(BunyanInst.error).to.not.be.called;

                    expect(RestifyInst.outputHandler).to.be.calledOnce
                        .calledWithMatch({
                            message: "Unknown fatal error",
                            type: "UncaughtError" /* This is a bit more coupled than I'd like */
                        }, null, {}, res, null);

                });


        });

    });

    describe("Error handling", function () {

        var Restify,
            RestifyInst;
        beforeEach(function () {

            Restify = rootRequire("./src/service/library/Restify");
            RestifyInst = new Restify({
                port: 3000
            });
            RestifyInst.start = sinon.stub()
                .yieldsAsync(null);

            RestifyStub = function () {
                return RestifyInst;
            };

            Main = proxyquire("../../src/Main", {
                "./service/library/Restify": RestifyStub,
                "./service/library/Bunyan": BunyanStub
            });

        });

        it("should listen for a Validation error and log to debug", function (done) {

            var obj = new Main(config)
                .on("config", function () {

                    var err = new Errors.Validation("Some validation error");

                    /* Emit this error through the server */
                    RestifyInst.emit("error", err);

                    expect(BunyanInst.debug).to.be.calledOnce
                        .calledWith(err);

                    expect(BunyanInst.error).to.not.be.called;
                    expect(BunyanInst.fatal).to.not.be.called;

                    done();

                });

        });

        it("should listen for an Application error and log to fatal", function (done) {

            var obj = new Main(config)
                .on("config", function () {

                    var err = new Errors.Application("Some application error");

                    /* Emit this error through the server */
                    RestifyInst.emit("error", err);

                    expect(BunyanInst.fatal).to.be.calledOnce
                        .calledWith(err);

                    expect(BunyanInst.debug).to.not.be.called;
                    expect(BunyanInst.error).to.not.be.called;

                    done();

                });

        });

        it("should listen for an Error and log to error", function (done) {

            var obj = new Main(config)
                .on("config", function () {

                    var err = new Error("Some error");

                    /* Emit this error through the server */
                    RestifyInst.emit("error", err);

                    expect(BunyanInst.error).to.be.calledOnce
                        .calledWith(err);

                    expect(BunyanInst.debug).to.not.be.called;
                    expect(BunyanInst.fatal).to.not.be.called;

                    done();

                });

        });

        it("should listen for an UncaughtError and not log to anything", function (done) {

            var obj = new Main(config)
                .on("config", function () {

                    var err = new UncaughtError("Some error");

                    /* Emit this error through the server */
                    RestifyInst.emit("error", err);

                    expect(BunyanInst.debug).to.not.be.called;
                    expect(BunyanInst.error).to.not.be.called;
                    expect(BunyanInst.fatal).to.not.be.called;

                    done();

                });

        });

    });

});


