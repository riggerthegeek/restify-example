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
var fs = require("fs");


/* Third-party modules */
var chai = require("chai");
var proxyquire = require("proxyquire");
var sinon = require("sinon");


/* Files */
var Routes = rootRequire("./src/service/routes");

chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Routes test", function () {

    var container,
        outputHandler;

    beforeEach(function () {
        container = {
            process: sinon.stub()
        };
        outputHandler = sinon.stub();
    });

    describe("Instantiation tests", function () {

        it("should set up the top-level routes and expose them", function () {

            sinon.stub(Routes, "GetRouteFiles")
                .returns([
                    "testRoute.js",
                    "ignoredfile.js"
                ]);

            var getFn = function () {};
            var postFn = function () {};

            var TestRoute = sinon.stub()
                .returns({
                    "/": {
                        get: getFn,
                        post: postFn
                    }
                });

            sinon.stub(Routes, "LoadFile")
                .withArgs("testRoute")
                .returns(TestRoute);

            var obj = new Routes();

            /* Test the route not invoked */
            expect(TestRoute).to.not.be.called;

            expect(obj.getRoutes()).to.be.eql({
                test: TestRoute
            });

            Routes.GetRouteFiles.restore();
            Routes.LoadFile.restore();

        });

    });

    describe("Static methods", function () {

        describe("#GetRouteFiles", function () {

            it("should exposes a series of files", function () {

                expect(Routes.GetRouteFiles()).to.be.an("array")
                    .to.have.length.of.at.least(1)
                    .to.contain("index.js")
                    .to.be.eql(fs.readdirSync(require("path").join(process.cwd(), "/src/service/routes")));

            });

        });

        describe("#LoadFile", function () {

            it("should use the require method to load a file", function () {

                var stub = {};

                var Routes2 = proxyquire("../../../../src/service/routes", {
                    "./index": stub
                });

                /**
                 * Annoyingly, the file has to exist, so use
                 * the same file as we're testing. Shouldn't
                 * matter greatly as we're stubbing it.
                 */
                var file = Routes2.LoadFile("index");

                expect(file).to.be.equal(stub);

            });

            it("should throw an error for a non-existent file", function () {

                var fail = false;

                try {
                    Routes.LoadFile("non-existent-file");
                } catch (err) {

                    fail = true;

                    expect(err).to.be.instanceof(Error);
                    expect(err.message).to.be.equal("Cannot find module './non-existent-file'");
                    expect(err.code).to.be.equal("MODULE_NOT_FOUND");


                } finally {
                    expect(fail).to.be.true;
                }

            });

        });

    });

});


