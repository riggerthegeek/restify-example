/**
 * Basic
 */

"use strict";


/* Node modules */


/* Third-party modules */
var chai = require("chai");
var proxyquire = require("proxyquire");
var sinon = require("sinon");


/* Files */
var Basic = require("../../../..//src/service/authorization/Basic");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("Basic authorization test", function () {

    var fn,
        getUser,
        req,
        res;
    beforeEach(function () {

        /* Expose a closure */
        expect(Basic).to.be.a("function");

        /* Invoke the closure with the getUser function */
        getUser = sinon.stub();
        fn = Basic(getUser);

        expect(fn).to.be.a("function");

        req = {
            headers: {},
            logIn: sinon.stub()
        };

        res = {
            end: sinon.stub(),
            setHeader: sinon.stub()
        };

    });

    it("should pass the HTTP Basic test", function (done) {

        req.headers.authorization = "Basic dXNlcm5hbWU6cGFzc3dvcmQ=" /* username:password */

        getUser
            .withArgs("username", "password")
            .yields(null, {});

        req.logIn
            .yields(null);

        /* Only returns an error - can pass in the callback */
        fn(req, res, done);

    });

    it("should fail the HTTP Basic test", function () {

        req.headers.authorization = "Basic dXNlcm5hbWU6cGFzc3dvcmQ=" /* username:password */

        getUser
            .withArgs("username", "password")
            .yields(null, null);

        fn(req, res, null);

        expect(res.setHeader).to.be.calledOnce
            .calledWithExactly("WWW-Authenticate", [
                "Basic realm=\"Users\""
            ]);

        expect(res.end).to.be.calledOnce
            .calledWithExactly("Unauthorized");

    });

    it("should fail the getUser call", function (done) {

        req.headers.authorization = "Basic dXNlcm5hbWU6cGFzc3dvcmQ=" /* username:password */

        getUser
            .withArgs("username", "password")
            .yields("error");

        fn(req, res, function (err) {
            expect(err).to.be.equal("error");
            done();
        });

        expect(res.setHeader).to.not.be.called;

        expect(res.end).to.not.be.called;

    });

});


