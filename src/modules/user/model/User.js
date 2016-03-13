/**
 * User
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Inject} from "steeplejack/decorators/inject";
import {Model} from "steeplejack/lib/model";


/* Files */


@Inject({
    name: "UserModel",
    factory: true
})
export class User extends Model {


    _schema () {

        return {

            id: {
                type: "integer"
            },

            firstName: {
                type: "string"
            },

            lastName: {
                type: "string"
            },

            emailAddress: {
                type: "string",
                validation: [{
                    rule: "required"
                }, {
                    rule: "email"
                }, {
                    rule: (value) => {

                        if (value === "test@test.com") {
                            throw new Error("system email address");
                        }

                        return true;

                    }
                }]
            }

        };

    }


}
