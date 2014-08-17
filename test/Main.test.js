///**
// * Main
// */
//
//"use strict";
//
//
///**
// * Root Require
// *
// * This is a convenience method that prefixes the require
// * path with the root path so as to help calling the
// * correct file.
// *
// * @param {string} file
// * @returns {*}
// */
//function rootRequire(file) {
//    return require(require("path").join(process.cwd(), file));
//}
//
//
///* Node modules */
//var EventEmitter = require("events").EventEmitter;
//
//
///* Third-party modules */
//var chai = require("chai");
//var sinon = require("sinon");
//
//var steeplejack = require("steeplejack");
//
//
///* Files */
//var config = rootRequire("./config");
//var Main = rootRequire("./src/Main");
//
//
//chai.use(require("sinon-chai"));
//var expect = chai.expect;
//
//
//describe("Main test", function () {
//
//    describe("Instantiation test", function () {
//
//        it("should expose a steeplejack instance", function (done) {
//
//            var obj = new Main(config);
//
//            expect(obj).to.be.instanceof(steeplejack.Base)
//                .to.be.instanceof(EventEmitter);
//
//            obj.on("config", function (serverConfig) {
//
//                expect(serverConfig).to.be.an("object");
//                expect(serverConfig).to.be.equal(config);
//
//                done();
//
//            });
//
//        });
//
//    });
//
//});
//
//
