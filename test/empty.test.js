const assert = require('assert');
const suite = require('mocha').suite;
const test = require('mocha').test;

const postcss = require('postcss');
const explodeSelectors = require('../');

function process(css, options) {
    return postcss( explodeSelectors(options) ).process(css).css;
}

let css;
let result;

suite('Empty file', () => {

    test('empty file w/ defaults', () => {
        css = '';
        result = process( css );

        assert.strictEqual( result, '' );
    });

    [ {}, null, undefined ].forEach( options => {

        test(`empty file w/ ${options}`, () => {
            css = '';
            result = process( css, options );
        });

    });

});
