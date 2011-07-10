var sys = require('sys'),
    fs = require('fs'),
    inspect = require('eyes').inspector({ maxLength: 99999 }),
    log = function(label, obj) {
        console.log('---> ' + label + ':');
        inspect(obj);
        console.log('<--- ' + label + '\n');
    };

fs.readFile(process.argv[2], 'utf8', function(err, input){
    if (err) throw err;
    console.log(input);
    try {
        var krasota = require('../lib/krasota'),
            tree = krasota.KrasotaJSParser.matchAll(
                input,
                'topLevel',
                undefined,
                function(m, i) { throw { errorPos: i, toString: function(){ return "match failed" } } }
            );
        log('tree', tree);
    } catch (e) {
        e.errorPos != undefined &&
            sys.error(
                input.slice(0, e.errorPos) +
                "\n--- Parse error ->" +
                input.slice(e.errorPos) + '\n');
        console.log('error: ' + e);
        throw e
    }

    try {
        var result = krasota.KrasotaJSSerializer.matchAll(
                tree,
                'topLevel',
                undefined,
                function(m, i) { throw { errorPos: i, toString: function(){ return "match failed" } } }
            );
        log('result', result);
        console.log(result);
    } catch (e) {
        e.errorPos != undefined &&
            sys.error(
                tree.slice(0, e.errorPos) +
                "\n--- Parse error ->" +
                tree.slice(e.errorPos) + '\n');
        console.log('error: ' + e);
        throw e
    }

});
