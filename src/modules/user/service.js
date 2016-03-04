/**
 * service
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Steeplejack} from "steeplejack";
import {Inject} from "steeplejack/decorators/inject";
import {ValidationException} from "steeplejack/exception/validation";


/* Files */


@Inject({
    name: "$userService"
})
export class UserService {


    constructor (UserModel, userStore) {

        this._deps = {
            UserModel,
            userStore
        };

    }


    getUserByEmailAddress (emailAddress) {

        /* Check input is an email */
        try {
            Steeplejack.validation.email(emailAddress);
        } catch (err) {
            throw new ValidationException("emailAddress is required");
        }

        /* Check the database for the user */
        return this._deps.userStore.getUserByEmailAddress(emailAddress)
            .then(res => {

                if (res) {
                    return new this._deps.UserModel(res);
                }

            });

    }


}
