/**
 * poolLogger
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


/* Third-party modules */
var chai = require("chai");
var sinon = require("sinon");


/* Files */
var poolLogger = rootRequire("./src/data/helpers/poolLogger");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Pool to Log4JS test", function () {

    var logger;
    beforeEach(function () {
        logger = {
            error: sinon.stub(),
            info: sinon.stub(),
            trace: sinon.stub(),
            warn: sinon.stub()
        };
    });

    it("should return a function", function () {

        var fn = poolLogger("name");

        expect(fn).to.be.a("function");

    });

    it("should throw an error when name not a string", function () {

        var fail = false;
        try {
            var fn = poolLogger();
        } catch (err) {
            fail = true;

            expect(err).to.be.instanceof(Error);
            expect(err.message).to.be.equal("Name must be a string");
        } finally {
            expect(fail).to.be.true;
        }

    });

    it("should log an error", function () {

        var fn = poolLogger("name", logger);

        expect(fn("some message", "error")).to.be.undefined;

        expect(logger.error).to.be.calledOnce
            .calledWith("name pool: some message");

    });

    it("should log info", function () {

        var fn = poolLogger("key", logger);

        expect(fn("some other message", "info")).to.be.undefined;

        expect(logger.info).to.be.calledOnce
            .calledWith("key pool: some other message");

    });

    it("should log a warning", function () {

        var fn = poolLogger("key", logger);

        expect(fn("some other message", "warn")).to.be.undefined;

        expect(logger.warn).to.be.calledOnce
            .calledWith("key pool: some other message");

    });

    it("should anything else as trace", function () {

        var fn = poolLogger("key", logger);

        expect(fn("some other message", "cobblers")).to.be.undefined;

        expect(logger.trace).to.be.calledOnce
            .calledWith("key pool: some other message");

    });

    it("should handle a level as a non-string", function () {

        var fn = poolLogger("key", logger);

        expect(fn("some other message", {})).to.be.undefined;

        expect(logger.trace).to.be.calledOnce
            .calledWith("key pool: some other message");

    });

});
