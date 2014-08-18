/**
 * AppServices
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


/* Files */
var AppServices = rootRequire("./src/application/AppServices");


chai.use(require("sinon-chai"));
var expect = chai.expect;


describe("AppServices test", function () {

    describe("Instantiation tests", function () {

        it("should create an instance of AppServices", function () {

            var obj = new AppServices();

            expect(obj).to.be.instanceof(AppServices)
                .to.be.instanceof(steeplejack.Base);

        });

    });

    describe("Methods", function () {

        describe("#getServices", function () {

            it("should get the registered services", function () {

                var obj = new AppServices();

                var services = obj.getServices();

                expect(services).to.be.an("object")
                    .to.have.keys([
                        "Test"
                    ]);

                expect(services.Test).to.be.a("function")
                    .to.be.equal(rootRequire("./src/application/Test/Service"));

            });

        });

    });

});
