function beautifiersOpt() {
    this.opt()
        .name('beautifiers').title('Local or global path to beautifier module, can be used many times')
        .short('b').long('beautifier')
        .arr()
        .req()
        .val(function(b) {
            return typeof b == 'string'
                ? require(b.match(/^\./) ? require('path').resolve(b) : b).KrasotaJS
                : b
        })
        .end()
}

var COA = exports.COA = require('coa').Cmd()
    .name('krasota').helpful()
    .opt()
        .name('version').title('Version')
        .short('v').long('version')
        .only()
        .flag()
        .act(function(opts) {
            return JSON.parse(require('fs').readFileSync(__dirname + '/../package.json')).version;
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
    .apply(beautifiersOpt)
    .act(function(options) {
        var K = require('./krasota'),
            Q = require('q'),
            input = [],
            deferred = Q.defer();

        options.input
            .on('data', function(c) { input.push(c) })
            .once('end', function() {
                var output = options.output;

                try {
                    output.write(K.matchTop(
                        K.KrasotaJSSerializer,
                        K.KrasotaJSBeautify(
                            options.beautifiers,
                            K.matchTop(K.KrasotaJSParser, input.join(''), 'tree')),
                        'serialize'));
                } catch(e) {
                    console.log(e);
                }

                output === process.stdout ?
                    output.write('\n') :
                    output.end();

                deferred.resolve();
            })
            .resume();

        return deferred.promise;
    });

COA.cmd()
    .name('recursive').helpful()
    .apply(beautifiersOpt)
    .opt()
        .name('backup').title('Saving backups with the specified extension. If a zero-length extension is given, no backup will be saved.')
        .long('backup')
        .req()
        .end()
    .opt()
        .name('ignore').title('Ignore mask (.gitignore-style).')
        .long('ignore').short('i')
        .arr()
        .end()
    .opt()
        .name('ignoreFile').title('File name for looking ignore masks (in addition with .krasotaignore).')
        .long('ignore-file')
        .arr()
        .end()
    .arg()
        .name('directory')
        //.arr()
        .def(process.cwd())
        .end()
    .act(require('./recursive')(COA))
    .end();
