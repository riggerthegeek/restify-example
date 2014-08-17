/**
 * Store
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
var StoreError = rootRequire("./src/error/Store");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("StoreError test", function () {

    describe("Instantation tests", function () {

        it("should extend the steeplejack Fatal exception and ApplicationError", function () {

            var obj = new StoreError("text");

            expect(obj).to.be.instanceof(StoreError)
                .to.be.instanceof(ApplicationError)
                .to.be.instanceof(steeplejack.Exceptions.Fatal);

            expect(obj.getType()).to.be.equal("StoreError");
            expect(obj.getMessage()).to.be.equal("text");

        });

    });

    describe("Methods", function () {

        var obj;
        beforeEach(function () {
            obj = new StoreError("text");

            expect(obj.getType()).to.be.equal("StoreError");
            expect(obj.getMessage()).to.be.equal("text");
        });

        describe("#getDetail", function () {

            it("should return the detail object literal", function () {
                expect(obj.getDetail()).to.be.eql({
                    type: "StoreError",
                    message: "text"
                });
            });

        });

        describe("#getHttpCode", function () {

            it("should return the HTTP code", function () {
                expect(obj.getHttpCode()).to.be.equal(503);
            });

        });

    });

});


