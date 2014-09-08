/**
 * TestEndpoint
 */

"use strict";


/* Node modules */


/* Third-party modules */
var chai = require("chai");
var sinon = require("sinon");


/* Files */
var testEndpoint = require("../../../../src/service/endpoints/TestEndpoint");


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


