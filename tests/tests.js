var UTIL = require('util'),
    FS = require('fs'),
    K = require('../lib/krasota'),
    fileName = process.argv[2];

FS.readFile(fileName, 'utf8', function(err, input){
    if (err) throw err;
    log(input);
    var tree = matchTop(K.KrasotaJSParser, input, 'tree'),
        identity = matchTop(K.KrasotaJSIdentity, tree, 'identity'),
        beautify = K.KrasotaJSBeautify(
            //[K.KrasotaJSBeautifyTrailingWhitespace, K.KrasotaJSBeautifyJoinVars],
            [],
            identity),
        serialize = matchTop(K.KrasotaJSSerializer, beautify, 'serialize');

    OkOrNot(input == serialize, fileName);
    input != serialize &&
        FS.writeFileSync(fileName + '.res', serialize)

});

function matchTop(gramma, tree, label) {
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
}


var inspect = require('eyes').inspector({ maxLength: 99999, stream: process.stderr });

function log(label, obj) {
    if(process.env.KRASOTA_ENV != 'development') return;
    if(arguments.length == 2) {
        UTIL.error('---> ' + label + ':');
        inspect(obj);
        UTIL.error('<--- ' + label + '\n');
    } else UTIL.error(' \n' + label);
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
