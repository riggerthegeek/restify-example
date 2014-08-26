/**
 * Test Store
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
var testStore = rootRequire("./src/data/stores/test");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Test store test", function () {

    var logger,
        testRestource,
        obj,
        client;
    beforeEach(function () {

        testRestource = {
            acquire: sinon.stub(),
            release: sinon.stub()
        };

        obj = testStore(logger, testRestource);

        client = {
            query: sinon.stub()
        };

    });

    describe("#getUserByUsernameAndPassword", function () {

        it("should handle an acquire error", function (done) {

            var error = new Error("message");
            testRestource.acquire
                .yields(error);

            obj.getUserByUsernameAndPassword("username", "password", function (err, data) {

                expect(err).to.be.equal(error);
                expect(data).to.be.null;

                expect(testRestource.acquire).to.be.calledOnce;
                expect(client.query).to.not.be.called;

                done();

            });

        });

        it("should handle a query error", function (done) {

            testRestource.acquire
                .yields(null, client);

            var error = new Error("message");

            client.query
                .yields(error);

            obj.getUserByUsernameAndPassword("username", "password", function (err, data) {

                expect(err).to.be.equal(error);
                expect(data).to.be.null;

                expect(testRestource.acquire).to.be.calledOnce;
                expect(testRestource.release).to.be.calledOnce
                    .calledWith(client);
                expect(client.query).to.be.calledOnce
                    .calledWith("SELECT * FROM table");

                done();

            });

        });

        it("should return a valid query and match the username and password", function (done) {

            testRestource.acquire
                .yields(null, client);

            var data = [{
                username: "test1",
                password: "test"
            }, {
                username: "test2",
                password: "test3"
            }];
            client.query
                .yields(null, data);

            obj.getUserByUsernameAndPassword("test1", "test", function (err, result) {

                expect(err).to.be.null;
                expect(result).to.be.eql({
                    username: "test1",
                    password: "test"
                });

                expect(testRestource.acquire).to.be.calledOnce;
                expect(testRestource.release).to.be.calledOnce
                    .calledWith(client);
                expect(client.query).to.be.calledOnce
                    .calledWith("SELECT * FROM table");

                done();

            });

        });

        it("should return a valid query and not match the username and password", function (done) {

            testRestource.acquire
                .yields(null, client);

            var data = [{
                username: "test1",
                password: "test"
            }, {
                username: "test2",
                password: "test3",
            }];
            client.query
                .yields(null, data);

            obj.getUserByUsernameAndPassword("test1", "wrongpassword", function (err, result) {

                expect(err).to.be.null;
                expect(result).to.be.null;

                expect(testRestource.acquire).to.be.calledOnce;
                expect(testRestource.release).to.be.calledOnce
                    .calledWith(client);
                expect(client.query).to.be.calledOnce
                    .calledWith("SELECT * FROM table");

                done();

            });

        });

    });

    describe("#getUsers", function () {

        it("should handle an acquire error", function (done) {

            var error = new Error("message");
            testRestource.acquire
                .yields(error);

            obj.getUsers(function (err, data) {

                expect(err).to.be.equal(error);
                expect(data).to.be.null;

                expect(testRestource.acquire).to.be.calledOnce;
                expect(client.query).to.not.be.called;

                done();

            });

        });

        it("should handle a query error", function (done) {

            testRestource.acquire
                .yields(null, client);

            var error = new Error("message");

            client.query
                .yields(error);

            obj.getUsers(function (err, data) {

                expect(err).to.be.equal(error);
                expect(data).to.be.null;

                expect(testRestource.acquire).to.be.calledOnce;
                expect(testRestource.release).to.be.calledOnce
                    .calledWith(client);
                expect(client.query).to.be.calledOnce
                    .calledWith("SELECT * FROM table");

                done();

            });

        });

        it("should return a valid query", function (done) {

            testRestource.acquire
                .yields(null, client);

            var data = {};
            client.query
                .yields(null, data);

            obj.getUsers(function (err, result) {

                expect(err).to.be.null;
                expect(result).to.be.equal(data);

                expect(testRestource.acquire).to.be.calledOnce;
                expect(testRestource.release).to.be.calledOnce
                    .calledWith(client);
                expect(client.query).to.be.calledOnce
                    .calledWith("SELECT * FROM table");

                done();

            });

        });

    });

});


