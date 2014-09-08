/**
 * Authorization
 */

"use strict";


/* Node modules */


/* Third-party modules */
var chai = require("chai");
var sinon = require("sinon");


/* Files */
var authorization = require("../../../../src/service/authorization");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Authorization test", function () {

    it("should expose the authorization methods", function () {

        expect(authorization).to.be.have.keys([
            "Basic"
        ]);

        expect(authorization.Basic).to.be.equal(require("../../../../src/service/authorization/Basic"));

    });

});


