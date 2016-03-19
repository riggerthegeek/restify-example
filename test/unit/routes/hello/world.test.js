/**
 * world.test
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */
import {route} from "../../../../src/routes/hello/world";
import {expect, sinon} from "../../../helpers/config";


describe("/hello/world route", function () {

    describe("/", function () {

        describe("GET", function () {

            it("should return {hello:world}", function () {

                let req = {
                    req: "req"
                };
                let res = {
                    res: "res"
                };

                expect(route()["/"].get(req, res)).to.be.eql({
                    hello: "world"
                });

            });

        });

    });

});
