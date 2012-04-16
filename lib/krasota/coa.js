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
        .name('beautifilers').title('Beautifiler')
        .short('b').long('beautifiler')
        .arr()
        .val(function(b) {
            return require(require('path').resolve(b))
        })
        .end()
    .act(function(options) {
        var input = [],
            deferred = q.defer();

        options.input
            .on('data', function(c) { input.push(c) })
            .once('end', function() {
                var output = options.output;

                output.write(input.join(''));

                output === process.stdout ?
                    output.write('\n') :
                    output.end();

                deferred.resolve();
            })
            .resume();

        return deferred.promise;
    });
