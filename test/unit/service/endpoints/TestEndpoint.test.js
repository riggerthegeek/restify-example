/**
 * TestEndpoint
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
var testEndpoint = rootRequire("./src/service/endpoints/testEndpoint");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("testEndpoint test", function () {

    var obj,
        logger,
        testService;
    beforeEach(function () {

        logger = {};

        testService = {
            getHome: sinon.stub()
        };

        obj = new testEndpoint(logger, testService);

    });

    describe("Methods", function () {

        describe("#getHome", function () {

            it("should call the testServer.getHome method", function (done) {

                var output = {};

                testService.getHome.yields(null, output);

                obj.getHome(function (err, result) {

                    expect(testService.getHome).to.have.been.calledOnce;

                    expect(err).to.be.null;
                    expect(result).to.be.equal(output);

                    done();

                });

            });

        });

    });

});


