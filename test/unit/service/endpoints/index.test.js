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
var Endpoints = rootRequire("./src/service/endpoints");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Endpoints test", function () {

    describe("Instantiation tests", function () {

        it("should set up the top-level endpoints and expose them", function () {

            sinon.stub(Endpoints, "GetEndpointFiles")
                .returns([
                    "testedEndpoint.js",
                    "ignoredfile.js"
                ]);

            var fn = function () {};

            var TestEndpoint = sinon.stub()
                .returns({
                    getTest: fn
                });

            sinon.stub(Endpoints, "LoadFile")
                .withArgs("testedEndpoint")
                .returns(TestEndpoint);

            var obj = new Endpoints();

            /* Test the route not invoked */
            expect(TestEndpoint).to.not.be.called;

            expect(obj.getEndpoints()).to.be.eql({
                tested: TestEndpoint
            });

            Endpoints.GetEndpointFiles.restore();
            Endpoints.LoadFile.restore();

        });

        describe("Static methods", function () {

            describe("#GetEndpointFiles", function () {

                it("should exposes a series of files", function () {

                    expect(Endpoints.GetEndpointFiles()).to.be.an("array")
                        .to.have.length.of.at.least(1)
                        .to.contain("index.js")
                        .to.be.eql(fs.readdirSync(require("path").join(process.cwd(), "/src/service/endpoints")));

                });

            });

            describe("#LoadFile", function () {

                it("should use the require method to load a file", function () {

                    var stub = {};

                    var Endpoints2 = proxyquire("../../../../src/service/endpoints", {
                        "./index": stub
                    });

                    /**
                     * Annoyingly, the file has to exist, so use
                     * the same file as we're testing. Shouldn't
                     * matter greatly as we're stubbing it.
                     */
                    var file = Endpoints2.LoadFile("index");

                    expect(file).to.be.equal(stub);

                });

                it("should throw an error for a non-existent file", function () {

                    var fail = false;

                    try {
                        Endpoints.LoadFile("non-existent-file");
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

});


