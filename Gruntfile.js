/**
 * Gruntfile
 *
 * Handles the building of the application.
 *
 * @param grunt
 */

/* Node modules */


module.exports = function (grunt) {

    "use strict";

    /* Load all grunt tasks */
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        config: {
            build: "build",
            src: "src",
            test: "test"
        },
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            all: [
                "./<%= config.build %>"
            ]
        },
        copy: {
            src: {
                cwd: "./<%= config.src %>",
                dest: "./<%= config.build %>/",
                expand: true,
                src: "**/*.js"
            }
        },
        jscs: {
            all: {
                options: {
                    config: ".jscsrc"
                },
                files: {
                    src: [
                        "Gruntfile.js",
                        "./<%= config.src %>/**/*.js"
                    ]
                }
            }
        },
        jshint: {
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                esnext: true,
                globals: {
                },
                immed: true,
                indent: 4,
                latedef: true,
                noarg: true,
                node: true,
                newcap: true,
                quotmark: "double",
                regexp: true,
                strict: true,
                trailing: true,
                undef: true,
                unused: false,
                ignores: [
                    "./<%= config.build %>/**",
                    "./node_modules/**",
                    "./<%= config.test %>/**"
                ]
            },
            all: {
                options: {
                    es3: true,
                    esnext: false,
                    globals: {
                        define: true,
                        navigator: true,
                        require: true,
                        window: true
                    }
                },
                files: {
                    src: [
                        "Gruntfile.js",
                        "./<%= config.src %>/**/*.js"
                    ]
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: "spec"
                },
                src: [
                    "./<%= config.test %>/**/*.js"
                ]
            }
        }
    });

    grunt.registerTask("build", "Build the package", [
        "clean:all",
        "test",
        "dist"
    ]);

    grunt.registerTask("default", [
        "build"
    ]);

    grunt.registerTask("dist", "Create the distributable files", [
        "copy:src"
    ]);

    grunt.registerTask("lint", "Run the lint tests", [
        "jshint:all",
        "jscs:all"
    ]);

    grunt.registerTask("test", "Perform tests on the codebase", [
        "lint",
        "unittest"
    ]);

    grunt.registerTask("unittest", "Run the unit tests", [
        "mochaTest:test"
    ]);

};
