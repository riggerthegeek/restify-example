#!/bin/sh

steeplejack run --config-file ./config.json --main ./src/Main.js "$@" | ./node_modules/.bin/bunyan
