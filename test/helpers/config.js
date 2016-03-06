/**
 * config
 */

"use strict";


/* Node modules */


/* Third-party modules */
import chai from "chai";
import sinon from "sinon";
import sinonAsPromised from "sinon-as-promised";
import sinonChai from "sinon-chai";


/* Files */


chai.use(sinonChai);

let expect = chai.expect;

export {
    expect,
    sinon
};
