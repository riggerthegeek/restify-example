/**
 * Validation
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
var ValidationError = rootRequire("./src/error/Validation");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("ValidationError test", function () {

    describe("Instantation tests", function () {

        it("should extend the steeplejack Validation exception", function () {

            var obj = new ValidationError("text");

            expect(obj).to.be.instanceof(ValidationError)
                .to.be.instanceof(steeplejack.Exceptions.Validation)
                .to.not.be.instanceof(ApplicationError);

            expect(obj.getType()).to.be.equal("ValidationError");
            expect(obj.getMessage()).to.be.equal("text");

            expect(obj.hasErrors()).to.be.false;

            obj.addError("key", "value", "message");

            expect(obj.hasErrors()).to.be.true;

        });

    });

    describe("Methods", function () {

        var obj;
        beforeEach(function () {
            obj = new ValidationError("text");

            expect(obj.getType()).to.be.equal("ValidationError");
            expect(obj.getMessage()).to.be.equal("text");

            expect(obj.hasErrors()).to.be.false;

            obj.addError("key", "failed value", "error message");

            expect(obj.hasErrors()).to.be.true;
        });

        describe("#getDetail", function () {

            it("should return the detail object literal", function () {
                expect(obj.getDetail()).to.be.eql({
                    type: "ValidationError",
                    message: "text",
                    error: {
                        key: [{
                            message: "error message",
                            value: "failed value"
                        }]
                    }
                });
            });

        });

        describe("#getHttpCode", function () {

            it("should return the HTTP code", function () {
                expect(obj.getHttpCode()).to.be.equal(400);
            });

        });

    });

});


