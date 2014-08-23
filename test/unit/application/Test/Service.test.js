/**
 * Service
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
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;


/* Files */
var TestService = rootRequire("./src/application/Test/Service");

chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Service test", function () {


    describe("Instantiation tests", function () {

        it("should correctly create an instance of the class", function () {

            var logger = {};
            var testStore = {};

            var obj = new TestService(logger, testStore);

            expect(obj).to.be.instanceof(TestService)
                .to.be.instanceof(Base);

            expect(obj._logger).to.be.equal(logger);
            expect(obj._testStore).to.be.equal(testStore);

        });

    });

    describe("Methods", function () {

        var obj,
            logger,
            testStore;
        beforeEach(function () {

            logger = {}; /* Not used yet */
            testStore = {
                getUsers: sinon.stub()
            };

            obj = new TestService(logger, testStore);

        });

        describe("#getUsers", function () {

            it("should handle a valid call from the database", function (done) {

                testStore.getUsers.yields(null, {
                    id: 1
                });

                obj.getHome(function (err, result) {

                    expect(testStore.getUsers).to.have.been.calledOnce;

                    expect(err).to.be.null;
                    expect(result).to.be.eql({
                        id: 1
                    });

                    done();

                });

            });

            it("should handle a data error", function (done) {

                var err = new Error("message");

                testStore.getUsers.yields(err);

                obj.getHome(function (err, result) {

                    expect(testStore.getUsers).to.have.been.calledOnce;

                    expect(err).to.be.equal(err);
                    expect(result).to.be.null;

                    done();

                });

            });

        });

    });

});


