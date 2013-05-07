var krasota = exports,
    OMETA = require('ometajs'),
    UTIL = require('util');

krasota.KrasotaJSBeautify = function(beautifiers, tree) {
    var result = tree, beautifier, i = 0;
    while(beautifier = beautifiers[i++])
        try {
            result = beautifier.match(
                result,
                'topLevel',
                undefined,
                function(m, i) { throw {
                    errorPos: i,
                    toString: function() { return 'beautifier match failed' } } }
            );
        } catch (e) {
            if(e.errorPos != undefined) {
                tree.splice(e.errorPos, 0, '\n--- Parse error ->');
                UTIL.debug(tree);
            }
            UTIL.debug('error: ' + e);
            throw e
        }
    return result;
};

krasota.matchTop = function(gramma, tree, label) {
    try {
        var result = gramma.match(
                tree,
                'topLevel',
                undefined,
                function(m, i) { throw { errorPos: i, toString: function() { return label + ' match failed' } } }
            );
        log(label, result);
        //log(result);
        return result;
    } catch (e) {
        if(e.errorPos != undefined) {
            var isString = typeof tree === 'string';
            isString && (tree = tree.split(''));
            tree.splice(e.errorPos, 0, '\n--- Parse error ->');
            log(isString? tree.join('') : tree);
        }
        log(label + ' error: ' + e);
        throw e
    }
};


var log = krasota.log = function(label, obj) {
    if(process.env.KRASOTA_ENV != 'development') return;
    if(arguments.length == 2) {
        UTIL.debug('---> ' + label + ':');
        inspect(obj);
        UTIL.debug('<--- ' + label + '\n');
    } else UTIL.debug(' \n' + label);
};

var inspect = require('eyes').inspector({ maxLength: 99999, stream: process.stderr });

['coa', 'parser', 'identity', 'serializer']
    .forEach(function(n) { extend(krasota, require('./' + n)) });

function extend(to, from) { Object.getOwnPropertyNames(from).forEach(function(n) { to[n] = from[n] }) }
