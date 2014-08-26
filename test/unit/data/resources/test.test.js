/**
 * Test Resource
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


describe("Test resource test", function () {

    var testResource,
        poolModule,
        poolLogger;
    beforeEach(function () {

        poolModule = {
            Pool: sinon.stub()
        };

        poolLogger = sinon.stub().returns(function () { });

        testResource = proxyquire("../../../../src/data/resources/test", {
            "generic-pool": poolModule,
            "../helpers/poolLogger": poolLogger
        });

    });

    it("should return the test resource as a generic-pool module", function (done) {

        poolModule.Pool.returnsArg(0);

        var config = {};
        var logger = {};
        var resource = testResource(config, logger);

        expect(poolModule.Pool).to.be.calledOnce;

        expect(resource).to.have.keys([
            "name",
            "create",
            "destroy",
            "log"
        ]);

        expect(resource.name).to.be.equal("test");
        expect(resource.create).to.be.a("function");
        expect(resource.destroy).to.be.a("function");
        expect(resource.log).to.be.a("function");

        /* Invoke the destroy function */
        expect(resource.destroy()).to.be.undefined;

        /* Invoke the log function */
        resource.log();

        expect(poolLogger).to.be.calledOnce
            .calledWith("TestResource", logger)

        /* Invoke the create function */
        resource.create(function (err, resource) {

            expect(err).to.be.null;
            expect(resource).to.be.an("object")
                .to.have.keys([
                    "query"
                ]);

            expect(resource.query).to.be.a("function");

            resource.query("query", function (err, result) {

                expect(err).to.be.null;
                expect(result).to.be.eql([{
                    id: 1,
                    firstName: "Test",
                    lastName: "Testington",
                    username: "test1",
                    password: "test",
                    emailAddress: "test@test.com",
                    created: new Date()
                }, {
                    id: 2,
                    firstName: "Test2",
                    lastName: "Testington2",
                    username: "test2",
                    password: "test3",
                    emailAddress: "test2@test.com",
                    created: new Date()
                }])

                done();

            });

        });

    });

});


