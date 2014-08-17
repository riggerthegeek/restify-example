/**
 * Application
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


/* Third-party modules */
var chai = require("chai");
var sinon = require("sinon");


/* Files */
var ApplicationError = rootRequire("./src/error/Application");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Application test", function () {

    describe("Instantation tests", function () {

        it("should extend the steeplejack Fatal exception", function () {

            var obj = new ApplicationError("text");

            expect(obj).to.be.instanceof(ApplicationError)
                .to.be.instanceof(steeplejack.Exceptions.Fatal);

            expect(obj.getType()).to.be.equal("ApplicationError");
            expect(obj.getMessage()).to.be.equal("text");

        });

    });

    describe("Methods", function () {

        var obj;
        beforeEach(function () {
            obj = new ApplicationError("text");

            expect(obj.getType()).to.be.equal("ApplicationError");
            expect(obj.getMessage()).to.be.equal("text");
        });

        describe("#getDetail", function () {

            it("should return the detail object literal", function () {
                expect(obj.getDetail()).to.be.eql({
                    type: "ApplicationError",
                    message: "text"
                });
            });

        });

        describe("#getHttpCode", function () {

            it("should return the HTTP code", function () {
                expect(obj.getHttpCode()).to.be.equal(500);
            });

        });

    });

});


