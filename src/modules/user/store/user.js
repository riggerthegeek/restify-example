/**
 * user
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {_} from "lodash";
import {Inject} from "steeplejack/decorators/inject";
import {Promise} from "es6-promise";


/* Files */


/* Data - this would normally be in a DB */
const data = [{
    id: 1,
    firstName: "Test",
    lastName: "Testington",
    emailAddress: "test@test.com"
}];


@Inject({
    name: "userStore"
})
export class UserStore {


    getUserByEmailAddress (emailAddress) {

        return new Promise(resolve => {

            let user = _.reduce(data, (result, user) => {

                if (user.emailAddress === emailAddress) {
                    result = user;
                }

                return result;

            }, null);

            resolve(user);

        });

    }


}
