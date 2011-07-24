var sys = require('sys'),
    fs = require('fs'),
    krasota = require('../lib/krasota'),
    fileName = process.argv[2];

fs.readFile(fileName, 'utf8', function(err, input){
    if (err) throw err;
    log(input);
    var tree = matchTop(krasota.KrasotaJSParser, input, 'tree'),
        identity = matchTop(krasota.KrasotaJSIdentity, tree, 'identity'),
        result = matchTop(krasota.KrasotaJSSerializer, identity, 'result');

    OkOrNot(input == result, fileName);
    input != result &&
        fs.writeFileSync(fileName + '.res', result)

});

function matchTop(gramma, tree, label) {
    try {
        var result = gramma.matchAll(
                tree,
                'topLevel',
                undefined,
                function(m, i) { throw { errorPos: i, toString: function(){ return "match failed" } } }
            );
        log(label, result);
        //log(result);
        return result;
    } catch (e) {
        e.errorPos != undefined &&
            sys.error(
                tree.slice(0, e.errorPos) +
                "\n--- Parse error ->" +
                tree.slice(e.errorPos) + '\n');
        log('error: ' + e);
        throw e
    }
}


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
