/**
 * service.test
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {ValidationException} from "steeplejack/exception/validation";


/* Files */
import {expect, sinon} from "../../../helpers/config";
import {User} from "../../../../src/modules/user/model/User";
import {UserService} from "../../../../src/modules/user/service";


describe("UserService test", function () {

    beforeEach(function () {

        this.userStore = {
            getUserByEmailAddress: sinon.stub()
        };

        this.$userService = new UserService(User, this.userStore);

    });

    describe("methods", function () {

        it("should throw an error when no emailAddress", function () {

            let fail = false;

            try {
                this.$userService.getUserByEmailAddress();
            } catch (err) {
                fail = true;

                expect(err).to.be.instanceof(ValidationException);
                expect(err.message).to.be.equal("emailAddress is required");
            } finally {
                expect(fail).to.be.true;
            }

        });

        it("should throw an error when invalid emailAddress", function () {

            let fail = false;

            try {
                this.$userService.getUserByEmailAddress("not an email");
            } catch (err) {
                fail = true;

                expect(err).to.be.instanceof(ValidationException);
                expect(err.message).to.be.equal("emailAddress is required");
            } finally {
                expect(fail).to.be.true;
            }

        });

        it("should return undefined if nothing found", function () {

            this.userStore.getUserByEmailAddress.resolves(null);

            return this.$userService.getUserByEmailAddress("test@test.com")
                .then(result => {

                    expect(result).to.be.undefined;

                    expect(this.userStore.getUserByEmailAddress).to.be.calledOnce
                        .calledWithExactly("test@test.com");

                });

        });

        it("should return UserModel if data found", function () {

            this.userStore.getUserByEmailAddress.resolves({
                id: 1234,
                firstName: "Barry",
                lastName: "Scott",
                emailAddress: "barry@cillitbang.com"
            });

            return this.$userService.getUserByEmailAddress("barry@cillitbang.com")
                .then(result => {

                    expect(result).to.be.instanceof(User);

                    expect(result.getData()).to.be.eql({
                        id: 1234,
                        firstName: "Barry",
                        lastName: "Scott",
                        emailAddress: "barry@cillitbang.com"
                    });

                    expect(this.userStore.getUserByEmailAddress).to.be.calledOnce
                        .calledWithExactly("barry@cillitbang.com");

                });

        });

    });

});
