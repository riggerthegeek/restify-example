/**
 * Products.test
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");


/* Files */


describe("Products collection tests", function () {

    var Product,
        Products;
    beforeEach(function () {

        injector(function (_Products_) {
            Products = _Products_;
        }, {
            Product: function () {
                Product = steeplejack.Model.extend({
                    definition: {
                        id: {
                            type: "string"
                        }
                    }
                });

                return Product;
            }
        });

    });

    it("should define products collection", function () {

        var obj = new Products({
            id: 1,
            name: "name",
            price: 29.99
        });

        expect(obj).to.be.instanceof(steeplejack.Collection)
            .instanceof(Products);

        expect(obj.get(0)).to.be.instanceof(Product);

        expect(obj.toJSON()).to.be.eql([{
            id: "1"
        }]);

    });

});
