/**
 * User.test
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Model} from "steeplejack/lib/model";


/* Files */
import {expect} from "../../../../helpers/config";
import {User} from "../../../../../src/modules/user/model/User";


describe("User model test", function () {

    describe("methods", function () {

        describe("#constructor", function () {

            it("should extend the Steeplejack Model and provide default values", function () {

                let obj = new User();

                expect(obj).to.be.instanceof(User)
                    .instanceof(Model);

                expect(obj.getData()).to.be.eql({
                    id: null,
                    firstName: null,
                    lastName: null,
                    emailAddress: null
                });

            });

            it("should allow values to be coerced and set", function () {

                let obj = new User({
                    id: "12345",
                    firstName: "Test",
                    lastName: "Testington",
                    emailAddress: "test@test.com"
                });

                expect(obj).to.be.instanceof(User)
                    .instanceof(Model);

                expect(obj.getData()).to.be.eql({
                    id: 12345,
                    firstName: "Test",
                    lastName: "Testington",
                    emailAddress: "test@test.com"
                });

            });

        });

    });

});
