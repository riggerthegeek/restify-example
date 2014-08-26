/**
 * testRoute
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
var proxyquire = require("proxyquire");
var sinon = require("sinon");


/* Files */


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("testRoute test", function () {

    var testRoute,
        TestEndpoint,
        outputHandler,
        routes;
    beforeEach(function () {

        TestEndpoint = {
            getHome: sinon.stub()
        };

        testRoute = proxyquire("../../../../src/service/routes/testRoute", {
            "../endpoints/TestEndpoint": TestEndpoint
        });

        outputHandler = sinon.stub();

        routes = testRoute(outputHandler, TestEndpoint);

        expect(routes).to.be.an("object");

    });

    describe("GET:/", function () {

        it("should retrieve the endpoint", function (done) {

            var route = routes["/"].get;

            expect(route).to.be.an("array");

            var req = {};
            var res = {};

            var err = {};
            var data = {};
            TestEndpoint.getHome.yields(err, data);

            outputHandler.yields("ok");

            route[0](req, res, function (result) {

                expect(result).to.be.equal("ok");

                expect(TestEndpoint.getHome).to.be.calledOnce;

                expect(outputHandler).to.be.calledOnce
                    .calledWith(err, data, req, res);

                done();

            });

        });

    });

    describe("GET:/example", function () {

        it("should retrieve the endpoint", function (done) {

            var route = routes["/example"].get;

            expect(route).to.be.a("function");

            var req = {};
            var res = {};

            outputHandler.yields(null, null);

            route(req, res, function (err, result) {

                expect(err).to.be.null;
                expect(result).to.be.null;

                expect(outputHandler).to.have.been.calledOnce
                    .calledWith(null, { stubbed: {} }, req, res);

                done();

            });


        });

    });

});


