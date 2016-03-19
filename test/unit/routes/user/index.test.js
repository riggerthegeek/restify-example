/**
 * index.test
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */
import {route} from "../../../../src/routes/user/index";
import {expect, sinon} from "../../../helpers/config";


describe("/user route", function () {

    beforeEach(function () {

    });

    describe("/", function () {

        describe("GET", function () {

            it("should return $userService.getUserByEmailAddress", function () {

                let req = {
                    query: {
                        emailAddress: "test@test.com"
                    }
                };
                let res = {};

                let $userService = {
                    getUserByEmailAddress: sinon.stub().returns("userObj")
                };

                let user = route($userService);

                expect(user["/"].get(req, res)).to.be.equal("userObj");

                expect($userService.getUserByEmailAddress).to.be.calledOnce
                    .calledWithExactly("test@test.com");

            });

        });

        describe("POST", function () {

            it("should return $userService.createUser", function () {

                let req = {
                    body: {
                        my: "body"
                    }
                };
                let res = {};

                let $userService = {
                    createUser: sinon.stub().returns("userObj")
                };

                let user = route($userService);

                expect(user["/"].post(req, res)).to.be.equal("userObj");

                expect($userService.createUser).to.be.calledOnce
                    .calledWithExactly({
                        my: "body"
                    });

            });

        });

    });

});
