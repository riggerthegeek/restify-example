/**
 * Logger
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
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Third-party modules */
var chai = require("chai");
var sinon = require("sinon");


/* Files */
var Logger = rootRequire("./src/service/library/Logger");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Logger test", function () {

    var Bunyan,
        inst;
    beforeEach(function () {
        inst = {
            level: sinon.stub(),
            fatal: sinon.stub(),
            error: sinon.stub(),
            warn: sinon.stub(),
            info: sinon.stub(),
            debug: sinon.stub(),
            trace: sinon.stub()
        };
        Bunyan = {
            createLogger: sinon.stub()
                .returns(inst)
        };
    });

    describe("Instantiation tests", function () {

        it("should throw an error when created with no options", function () {

            var obj;
            var fail = false;

            try {
                obj = new Logger();
            } catch (err) {

                fail = true;

                expect(err).to.be.instanceof(TypeError);
                expect(err.message).to.be.equal("options.name (string) is required");

            } finally {

                expect(obj).to.be.undefined;

                expect(fail).to.be.true;

            }

        });

        it("should return an instance when name provided and default to error level", function () {

            var stub = sinon.stub(Logger, "Bunyan")
                .returns(Bunyan);

            var obj = new Logger({
                name: "test"
            });

            expect(stub).to.have.been.calledOnce;

            expect(Bunyan.createLogger).to.have.been.calledOnce
                .to.be.calledWith({
                    name: "test"
                });

            expect(inst.level).to.have.been.calledOnce
                .calledWith("error");

            expect(obj.fatal).to.be.a("function");
            expect(obj.error).to.be.a("function");
            expect(obj.warn).to.be.a("function");
            expect(obj.info).to.be.a("function");
            expect(obj.debug).to.be.a("function");
            expect(obj.trace).to.be.a("function");

            stub.restore();

        });

        it("should return an instance when name provided and default to error level", function () {

            var stub = sinon.stub(Logger, "Bunyan")
                .returns(Bunyan);

            var obj = new Logger({
                logLevel: "debug",
                name: "test"
            });

            expect(stub).to.have.been.calledOnce;

            expect(Bunyan.createLogger).to.have.been.calledOnce
                .to.be.calledWith({
                    name: "test"
                });

            expect(inst.level).to.have.been.calledOnce
                .calledWith("debug");

            expect(obj.fatal).to.be.a("function");
            expect(obj.error).to.be.a("function");
            expect(obj.warn).to.be.a("function");
            expect(obj.info).to.be.a("function");
            expect(obj.debug).to.be.a("function");
            expect(obj.trace).to.be.a("function");

            stub.restore();

        });

    });

    describe("Methods", function () {

        var stub,
            obj;
        beforeEach(function () {
            stub = sinon.stub(Logger, "Bunyan")
                .returns(Bunyan);

            obj = new Logger({
                name: "test"
            });
        });

        afterEach(function () {
            stub.restore();
        });

        describe("#fatal", function () {

            it("should call the bunyan fatal method", function () {

                inst.fatal.returns(true);

                expect(obj.fatal("message")).to.be.true;

                expect(inst.fatal).to.have.been.calledOnce
                    .to.have.been.calledWith("message");

            });

        });

        describe("#error", function () {

            it("should call the bunyan error method", function () {

                inst.error.returns(true);

                expect(obj.error("message")).to.be.true;

                expect(inst.error).to.have.been.calledOnce
                    .to.have.been.calledWith("message");

            });

        });

        describe("#warn", function () {

            it("should call the bunyan warn method", function () {

                inst.warn.returns(true);

                expect(obj.warn("message")).to.be.true;

                expect(inst.warn).to.have.been.calledOnce
                    .to.have.been.calledWith("message");

            });

        });

        describe("#info", function () {

            it("should call the bunyan info method", function () {

                inst.info.returns(true);

                expect(obj.info("message")).to.be.true;

                expect(inst.info).to.have.been.calledOnce
                    .to.have.been.calledWith("message");

            });

        });

        describe("#debug", function () {

            it("should call the bunyan debug method", function () {

                inst.debug.returns(true);

                expect(obj.debug("message")).to.be.true;

                expect(inst.debug).to.have.been.calledOnce
                    .to.have.been.calledWith("message");

            });

        });

        describe("#trace", function () {

            it("should call the bunyan trace method", function () {

                inst.trace.returns(true);

                expect(obj.trace("message")).to.be.true;

                expect(inst.trace).to.have.been.calledOnce
                    .to.have.been.calledWith("message");

            });

        });

    });

});


