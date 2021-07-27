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
let emptyOptions = { selectors: {} };
let customOptions = { selectors: { ':no': '.no' } };

[ 'hover', 'focus', 'focus-within', 'active', 'disabled', 'invalid' ].forEach( pseudo => {

    suite(`No match :${pseudo}`, () => {

        test('no selector w/ defaults', () => {
            css = 'a {color: red}';
            result = process( css );

            assert.strictEqual( result, 'a {color: red}' );
        });

        test('no selector w/ empty options', () => {
            css = 'a {color: red}';
            result = process( css, emptyOptions );

            assert.strictEqual( result, 'a {color: red}' );
        });

        test('no selector w/ custom options', () => {
            css = 'a {color: red}';
            result = process( css, customOptions );

            assert.strictEqual( result, 'a {color: red}' );
        });

        [ {}, null, undefined ].forEach( options => {

            test(`no selector w/ ${options}`, () => {
                css = 'a {color: red}';
                result = process( css, options );

                assert.strictEqual( result, 'a {color: red}' );
            });

        });

    });

    suite(`No exact match :${pseudo}ish`, () => {

        test('no exact selector w/ defaults', () => {
            css = `a:${pseudo}ish {color: red}`;
            result = process( css );

            assert.strictEqual( result, `a:${pseudo}ish {color: red}` );
        });

        test('no exact selector w/ empty options', () => {
            css = `a:${pseudo}ish {color: red}`;
            result = process( css, emptyOptions );

            assert.strictEqual( result, `a:${pseudo}ish {color: red}` );
        });

        test('no exact selector w/ custom options', () => {
            css = `a:${pseudo}ish {color: red}`;
            result = process( css, customOptions );

            assert.strictEqual( result, `a:${pseudo}ish {color: red}` );
        });

        [ {}, null, undefined ].forEach( options => {

            test(`no exact selector w/ ${options}`, () => {
                css = `a:${pseudo}ish {color: red}`;
                result = process( css, options );

                assert.strictEqual( result, `a:${pseudo}ish {color: red}` );
            });

        });

    });


    suite(`No exact match :${pseudo}-ish`, () => {

        test('no exact selector w/ defaults', () => {
            css = `a:${pseudo}-ish {color: red}`;
            result = process( css );

            assert.strictEqual( result, `a:${pseudo}-ish {color: red}` );
        });

        test('no exact selector w/ empty options', () => {
            css = `a:${pseudo}-ish {color: red}`;
            result = process( css, emptyOptions );

            assert.strictEqual( result, `a:${pseudo}-ish {color: red}` );
        });

        test('no exact selector w/ custom options', () => {
            css = `a:${pseudo}-ish {color: red}`;
            result = process( css, customOptions );

            assert.strictEqual( result, `a:${pseudo}-ish {color: red}` );
        });

        [ {}, null, undefined ].forEach( options => {

            test(`no exact selector w/ ${options}`, () => {
                css = `a:${pseudo}-ish {color: red}`;
                result = process( css, options );

                assert.strictEqual( result, `a:${pseudo}-ish {color: red}` );
            });

        });

    });

});