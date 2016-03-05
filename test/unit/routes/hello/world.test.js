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

            it("should return {hello:world}", function (done) {

                let req = {
                    req: "req"
                };
                let res = {
                    res: "res"
                };

                let $output = (request, response, iterator) => {

                    expect(req).to.be.equal(request);
                    expect(res).to.be.equal(response);

                    expect(iterator()).to.be.eql({
                        hello: "world"
                    });

                    done();

                };

                let helloWorld = route($output);

                expect(helloWorld["/"].get).to.be.an("array")
                    .to.have.length(1);

                expect(helloWorld["/"].get[0](req, res)).to.be.undefined;

            });

        });

    });

});
