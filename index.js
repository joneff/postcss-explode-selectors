const charRegEx = /[\w-]/;

const defaults = {
    selectors: {
        ':hover': '.hover',
        ':focus': '.focus',
        ':focus-within': '.focus-within',
        ':active': '.active',
        ':disabled': '.disabled',
        ':invalid': '.invalid'
    }
};

function pluginFactory( options ) {
    const opts = Object.assign( {}, defaults, options );
    const optsSelector = opts.selectors || [];

    return {
        postcssPlugin: '@joneff/postcss-explode-selectors',
        Rule: (rule) => {
            if (optsSelector.length === 0) {
                return;
            }

            let selectors = rule.selectors;
            let result = [ ...selectors ];

            selectors.forEach(originalRule => {
                let resultRule = originalRule;

                Object.entries(optsSelector).forEach( ([ match, extender ]) => {
                    let index = resultRule.indexOf(match);
                    let char;

                    if (index === -1) {
                        return;
                    }

                    resultRule = resultRule.replace( new RegExp(`${match}`, 'gi'), (match, offset) =>{
                        char = resultRule.charAt(offset + match.length);
                        if (char.match(charRegEx)) {
                            return match;
                        }

                        return extender;
                    });
                });

                if ( resultRule !== originalRule ) {
                    result.push( resultRule );
                }

            });

            if ( result.length !== selectors.length ) {
                rule.selectors = Array.from( new Set( result ) );
            }
        }
    };

}

pluginFactory.postcss = true;

module.exports = pluginFactory;
