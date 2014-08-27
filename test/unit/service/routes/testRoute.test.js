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
var async = require("async");
var chai = require("chai");
var proxyquire = require("proxyquire");
var sinon = require("sinon");


/* Files */


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("testRoute test", function () {

    var testRoute,
        testStore,
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

        testStore = {
            getUserByUsernameAndPassword: sinon.stub()
        };

        routes = testRoute(outputHandler, TestEndpoint, testStore);

        expect(routes).to.be.an("object");

    });

    describe("GET:/", function () {

        it("should retrieve the endpoint - successfully logging in with HTTP Basic  ", function (done) {

            var route = routes["/"].get;

            testStore.getUserByUsernameAndPassword
                .withArgs("username", "password")
                .yields(null, {
                    username: "username",
                    password: "password"
                });

            expect(route).to.be.an("array");

            var req = {
                headers: {
                    authorization: "Basic dXNlcm5hbWU6cGFzc3dvcmQ=" /* username:password */
                },
                logIn: function (user, options, cb) {
                    return cb(null);
                }
            };
            var res = {
                end: sinon.spy(),
                setHeader: sinon.spy()
            };

            var err = {};
            var data = {};
            TestEndpoint.getHome.yields(err, data);

            outputHandler.yields("ok");

            var endpoint = route.pop();

            async.each(route, function (fn, callback) {
                fn(req, res, callback);
            }, function (error) {

                expect(error).to.be.undefined;

                endpoint(req, res, function (result) {

                    expect(result).to.be.equal("ok");

                    expect(TestEndpoint.getHome).to.be.calledOnce;

                    expect(outputHandler).to.be.calledOnce
                        .calledWith(err, data, req, res);

                    done();

                });

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


