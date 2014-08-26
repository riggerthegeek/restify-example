/**
 * Authorization
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
var authorization = rootRequire("./src/service/authorization");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Authorization test", function () {

    it("should expose the authorization methods", function () {

        expect(authorization).to.be.have.keys([
            "Basic"
        ]);

        expect(authorization.Basic).to.be.equal(rootRequire("./src/service/authorization/Basic"));

    });

});


