var sys = require('sys'),
    fs = require('fs'),
    fileName = process.argv[2];

fs.readFile(fileName, 'utf8', function(err, input){
    if (err) throw err;
    log(input);
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
        log('error: ' + e);
        throw e
    }
    //return '';
    try {
        var result = krasota.KrasotaJSSerializer.matchAll(
                tree,
                'topLevel',
                undefined,
                function(m, i) { throw { errorPos: i, toString: function(){ return "match failed" } } }
            );
        log('result', result);
        log(result);
    } catch (e) {
        e.errorPos != undefined &&
            sys.error(
                tree.slice(0, e.errorPos) +
                "\n--- Parse error ->" +
                tree.slice(e.errorPos) + '\n');
        log('error: ' + e);
        throw e
    }

    OkOrNot(input == result, fileName);
    if(input != result) {
        fs.writeFileSync(fileName + '.res', result)
    }

});

var inspect = require('eyes').inspector({ maxLength: 99999 });

function log(label, obj) {
    if(process.env.KRASOTA_ENV != 'development') return;
    if(arguments.length == 2) {
        console.log('---> ' + label + ':');
        inspect(obj);
        console.log('<--- ' + label + '\n');
    } else console.log(label);
}

function OkOrNot(ok, msg) {
    var m = ok ? ['green', 'OK'] : ['red', 'NOT OK'];
    console.log(Color(m[0], m[1] + ': ' + msg));
}

var colors = {
    black: '30',
    dgray: '1;30',
    red: '31',
    lred: '1;31',
    green: '32',
    lgreen: '1;32',
    brown: '33',
    yellow: '1;33',
    blue: '34',
    lblue: '1;34',
    purple: '35',
    lpurple: '1;35',
    cyan: '36',
    lcyan: '1;36',
    lgray: '37',
    white: '1;37'
};

function Color(c, str) {
    return [
            '\033[', colors[c], 'm',
            str,
            '\033[m',
        ].join('');
}
