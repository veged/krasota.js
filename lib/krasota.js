var krasota = exports,
    OMETA = require('ometajs'),
    UTIL = require('util');

krasota.KrasotaJSBeautify = function(beautifilers, tree) {
    var result = tree, beautyfiler, i = 0;
    while(beautyfiler = beautifilers[i++])
        try {
            result = beautyfiler.match(
                result,
                'topLevel',
                undefined,
                function(m, i) { throw {
                    errorPos: i,
                    toString: function() { return 'beautifiler match failed' } } }
            );
        } catch (e) {
            if(e.errorPos != undefined) {
                tree.splice(e.errorPos, 0, '\n--- Parse error ->');
                UTIL.error(tree);
            }
            UTIL.error('error: ' + e);
            throw e
        }
    return result;
};

['coa', 'parser', 'identity', 'beautify', 'serializer']
    .forEach(function(n) { extend(krasota, require('./krasota/' + n)) });

function extend(to, from) { Object.getOwnPropertyNames(from).forEach(function(n) { to[n] = from[n] }) }
