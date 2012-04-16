var krasota = require('../krasota'),
    q = require('q');

exports.COA = require('coa').Cmd()
    .name('krasota').helpful()
    .opt()
        .name('version').title('Version')
        .short('v').long('version')
        .only()
        .flag()
        .act(function(opts) {
            return JSON.parse(require('fs').readFileSync(__dirname + '/../../package.json')).version;
        })
        .end()
    .opt()
        .name('input').title('Input file (default: stdin)')
        .short('i').long('input')
        .input()
        .end()
    .opt()
        .name('output').title('Output file (default: stdout)')
        .short('o').long('output')
        .output()
        .end()
    .opt()
        .name('beautifiers').title('Beautifier')
        .short('b').long('beautifier')
        .arr()
        .val(function(b) {
            return require(b.match(/^\./) ? require('path').resolve(b) : b).KrasotaJS
        })
        .end()
    .act(function(options) {
        var input = [],
            deferred = q.defer();

        options.input
            .on('data', function(c) { input.push(c) })
            .once('end', function() {
                var K = require('../krasota'),
                    output = options.output;

                output.write(K.matchTop(
                    K.KrasotaJSSerializer,
                    K.KrasotaJSBeautify(
                        options.beautifiers,
                        K.matchTop(K.KrasotaJSParser, input.join(''), 'tree')),
                    'serialize'));

                output === process.stdout ?
                    output.write('\n') :
                    output.end();

                deferred.resolve();
            })
            .resume();

        return deferred.promise;
    });
