var ometa = require('ometajs'),
    OMeta = ometa.OMeta,
    sys = require('sys');

exports.KrasotaJSBeautify = function(beautifilers, tree) {
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
                sys.error(tree);
            }
            sys.error('error: ' + e);
            throw e
        }
    return result;
};

