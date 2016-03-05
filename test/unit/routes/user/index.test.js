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

    describe("/", function () {

        describe("GET", function () {

            it("should return $userService.getUserByEmailAddress", function (done) {

                let req = {
                    query: {
                        emailAddress: "test@test.com"
                    }
                };
                let res = {};

                let $userService = {
                    getUserByEmailAddress: sinon.stub().returns("userObj")
                };

                let $output = (request, response, iterator) => {

                    expect(req).to.be.equal(request);
                    expect(res).to.be.equal(response);

                    expect(iterator()).to.be.eql("userObj");

                    done();

                };

                let user = route($output, $userService);

                expect(user["/"].get).to.be.an("array")
                    .to.have.length(1);

                expect(user["/"].get[0](req, res)).to.be.undefined;

            });

        });

    });

});
