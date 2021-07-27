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

suite('Reduce selectors', () => {

    test('reducie duplcate selectors', () => {
        css = ':hover, :hover, :hover, .hover {color: red}';

        result = process( css );
        assert.strictEqual( result, ':hover, .hover {color: red}' );
    });

    test('reducie zig zag selectors', () => {
        css = ':hover .focus, .hover :focus {color: red}';

        result = process( css );
        assert.strictEqual( result, ':hover .focus, .hover :focus, .hover .focus {color: red}' );
    });

});