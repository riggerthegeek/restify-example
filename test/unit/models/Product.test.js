/**
 * Product.test
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");


/* Files */


describe("Product model tests", function () {

    var Product;
    beforeEach(function () {

        injector(function (_Product_) {
            Product = _Product_;
        });

    });

    it("should define product model", function () {

        var obj = new Product();

        expect(obj).to.be.instanceof(steeplejack.Model)
            .instanceof(Product);

        expect(obj.toObject()).to.be.eql({
            id: null,
            name: null,
            price: 0
        });

    });

});
