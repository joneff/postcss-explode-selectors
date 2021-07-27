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

[ 'hover', 'focus', 'focus-within', 'active', 'disabled', 'invalid' ].forEach( pseudo => {

    suite(`Match :${pseudo}`, () => {

        [ '', 'a', '.a', '#a' ].forEach( selector => {

            test(`match ${selector} selector w/ defaults`, () => {
                css = `${selector}:${pseudo} {color: red}`;
                result = process( css );

                assert.strictEqual( result, `${selector}:${pseudo}, ${selector}.${pseudo} {color: red}` );
            });

        });

        test('match composite selector w/ defaults', () => {
            css = `:${pseudo}:${pseudo} {color: red}`;
            result = process( css );

            assert.strictEqual( result, `:${pseudo}:${pseudo}, .${pseudo}.${pseudo} {color: red}` );
        });

        test('match nested selector w/ defaults', () => {
            css = `:${pseudo} :${pseudo} {color: red}`;
            result = process( css );

            assert.strictEqual( result, `:${pseudo} :${pseudo}, .${pseudo} .${pseudo} {color: red}` );
        });

    });

});

suite('Match multiple pseudo', () => {

    test('match :hover,:focus', () => {
        css = ':hover, :focus {color: red}';
        result = process( css );

        assert.strictEqual( result, ':hover, :focus, .hover, .focus {color: red}' );
    });

    test('match :hover :focus', () => {
        css = ':hover :focus {color: red}';
        result = process( css );

        assert.strictEqual( result, ':hover :focus, .hover .focus {color: red}' );
    });

});