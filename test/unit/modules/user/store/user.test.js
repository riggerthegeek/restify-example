/**
 * user.test
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */
import {expect, sinon} from "../../../../helpers/config";
import {UserStore} from "../../../../../src/modules/user/store/user";


describe("UserStore test", function () {

    beforeEach(function () {

        this.userStore = new UserStore();

    });

    describe("Methods", function () {

        describe("getUserByEmailAddress", function () {

            it("should return a matching emailAddress", function () {

                return this.userStore.getUserByEmailAddress("test@test.com")
                    .then(result => {

                        expect(result).to.be.eql({
                            id: 1,
                            firstName: "Test",
                            lastName: "Testington",
                            emailAddress: "test@test.com"
                        });

                    });

            });

            it("should null if not matching emailAddress", function () {

                return this.userStore.getUserByEmailAddress("bob@bob.com")
                    .then(result => {

                        expect(result).to.be.null;

                    });

            });

        });

    });

});
