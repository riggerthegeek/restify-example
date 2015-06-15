/**
 * Gruntfile
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function (grunt) {

    "use strict";

    /* Load all grunt tasks */
    require("load-grunt-tasks")(grunt);
    require("grunt-timer").init(grunt);

    var pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
        config: {
            build: "build",
            coverage: "coverage",
            docs: "doc",
            src: "src",
            test: "test"
        },
        pkg: pkg,
        mochaTest: {
            options: {
                reporter: "spec",
                require: [
                    "test/helpers/injector",
                    "test/helpers/sinon"
                ],
                ui: "bdd"
            },
            unittest: {
                src: [
                    "./<%= config.test %>/unit/**/*.test.js"
                ]
            }
        },
    });

    grunt.registerTask("test", "Perform tests on the codebase", [
        "mochaTest:unittest"
    ]);

};
