/**
 * Gruntfile
 */

"use strict";


/* Node modules */


/* Third-party modules */
var semver = require("semver");


/* Files */


module.exports = function (grunt) {

    "use strict";

    /* Load all grunt tasks */
    require("load-grunt-tasks")(grunt);
    require("grunt-timer").init(grunt);

    var getSemverInc = function getSemverInc () {

        var bump = {
            increment: grunt.config.get("bump.increment"),
            version: grunt.config.get("bump.version")
        };

        var script = bump.increment;

        if (script === "custom") {
            script = bump.version;
        }

        return script;

    };

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
        prompt: {
            npmVersion: {
                options: {
                    questions: [{
                        choices: [{
                            value: "build",
                            name:  "Build:  " + (pkg.version + "-?").yellow + " Unstable, betas, and release candidates."
                        }, {
                            value: "patch",
                            name:  "Patch:  " + semver.inc(pkg.version, "patch").yellow + "   Backwards-compatible bug fixes."
                        }, {
                            value: "minor",
                            name:  "Minor:  " + semver.inc(pkg.version, "minor").yellow + "   Add functionality in a backwards-compatible manner."
                        }, {
                            value: "major",
                            name:  "Major:  " + semver.inc(pkg.version, "major").yellow + "   Incompatible API changes."
                        }, {
                            value: "custom",
                            name:  "Custom: " + "?.?.?".yellow + "   Specify version..."
                        }
                        ],
                        config: "bump.increment",
                        message: "What sort of increment would you like?",
                        type: "list"
                    }, {
                        config: "bump.version",
                        message: "What specific version would you like",
                        type: "input",
                        when: function (answers) {
                            return answers["bump.increment"] === "custom";
                        },
                        validate: function (value) {
                            var valid = semver.valid(value) && true;
                            return valid || "Must be a valid semver, such as 1.2.3-rc1. See " +
                                "http://semver.org/".blue.underline + " for more details.";
                        }
                    }]
                }
            }
        },
        shell: {
            commitPackage: {
                command: function () {

                    var version = getSemverInc();

                    var commands = [
                        "git add package.json",
                        "git commit -a -m 'Bumped to version " + version + "'"
                    ];

                    return commands.join(" && ");
                }
            },
            gitPush: {
                command: "git push"
            },
            gitPushTags: {
                command: "git push origin --tags"
            },
            npmVersion: {
                command: function () {

                    return "npm version " + getSemverInc();
                }
            }
        }
    });

    grunt.registerTask("buildPackage", "Rebuilds the package", function () {

        var version = semver.inc(pkg.version, getSemverInc());

        var newPkg = pkg;

        /* Change steeplejack version */
        newPkg.dependencies.steeplejack = version;

        grunt.file.write("package.json", JSON.stringify(newPkg, null, 2));

    });

    grunt.registerTask("tag", "Tag a new release", [
        "prompt:npmVersion",
        "buildPackage",
        "shell:commitPackage",
        "shell:npmVersion",
        "shell:gitPush",
        "shell:gitPushTags"
    ]);

    grunt.registerTask("test", "Perform tests on the codebase", [
        "mochaTest:unittest"
    ]);

};
