var UTIL = require('util'),
    FS = require('fs'),
    PATH = require('path'),
    K = require('../lib/krasota'),
    matchTop = K.matchTop,
    log = K.log,
    testFile = process.argv[2],
    testPrefix = testFile.replace(/\.js$/, ''),
    dir = PATH.dirname(testFile);

FS.readFile(testFile, 'utf8', function(err, input){
    if (err) throw err;
    log(input);
    var tree = matchTop(K.KrasotaJSParser, input, 'tree'),
        identity = matchTop(K.KrasotaJSIdentity, tree, 'identity'),
        beautify = K.KrasotaJSBeautify(
            fileContent(testPrefix + '.beautifiers')
                .split(/\s+/)
                .filter(function(b) { return b })
                .map(function(b) {
                    return require(b.match(/^\./) ? require('path').resolve(dir, b) : b).KrasotaJS
                }),
            identity),
        serialize = matchTop(K.KrasotaJSSerializer, beautify, 'serialize');

    OkOrNot(
        fileContent(testPrefix + '.expect', input) == serialize,
        testFile);
    input != serialize &&
        FS.writeFileSync(testPrefix + '.result', serialize)

});

function fileContent(path, or) {
    return FS.existsSync(path) ? String(FS.readFileSync(path)) : or || '';
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
