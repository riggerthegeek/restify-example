/**
 * index
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
var Errors = rootRequire("./src/error");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Error test", function () {

    it("should expose the error types", function () {

        expect(Errors).to.have.keys([
            "Application",
            "Store",
            "Validation"
        ]);

        expect(Errors.Application).to.be.equal(rootRequire("./src/error/Application"));
        expect(Errors.Store).to.be.equal(rootRequire("./src/error/Store"));
        expect(Errors.Validation).to.be.equal(rootRequire("./src/error/Validation"));

    });

});


