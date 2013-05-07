module.exports = function(KrasotaAPI) {

var FS = require('fs'),
    PATH = require('path'),
    Q = require('q'),
    IGNORE = require('ignore'),
    KrasotaAPI = KrasotaAPI.api;

function useIgnoreAndFindFiles(path, ignore, ignoreFiles) {
    var defer = Q.defer(),
        paths = [],
        pending = 0;

    function addIgnoreFiles(ignores, paths) {
        ignoreFiles.forEach(function(ignoreFile) {
            var ignoreFileIndex = paths.indexOf(ignoreFile);
            if(ignoreFileIndex != -1) {
                ignores.push([
                    PATH.relative(path, ignoreFile),
                    IGNORE({ ignore: [] })
                        .addIgnoreFile(PATH.join(path, paths[ignoreFileIndex]))
                        .createFilter()
                ]);
                paths.splice(ignoreFileIndex, 1);
            }
        });
    }

    function filterByIgnores(paths, ignores) {
        ignores.forEach(function(ignore) {
            var i = paths.length, path;
            while(path = paths[--i])
                ignore[1](PATH.join(ignore[0], path)) ||
                    paths.splice(i, 1);
        });
    }

    function traverse(path, ignores) {
        pending++;
        FS.stat(path, function(err, stat) {
            if(err)
                defer.reject(err);
            else
                if(stat.isDirectory()) {
                    pending++;
                    FS.readdir(path, function(err, paths) {
                        if(err)
                            defer.reject(err);
                        else {
                            addIgnoreFiles(ignores, paths);

                            filterByIgnores(paths, ignores);

                            paths.forEach(function(p) {
                                traverse(
                                    PATH.join(path, p),
                                    ignores.map(function(ignore) {
                                        return [PATH.join(ignore[0], p), ignore[1]]
                                    }));
                            });
                        }

                        pending--;
                    });
                } else if(stat.isFile()) {
                    paths.push(path);
                }

            if(!--pending) defer.resolve(paths);
        });
    }

    traverse(path, [['', IGNORE({ ignore: ignore }).createFilter()]]);

    return defer.promise;
}

return function(options, args) {
    return useIgnoreAndFindFiles(
        args.directory,
        options.ignore,
        ['.krasotaignore'].concat(options.ignoreFile || []))
            .then(function(paths) {
                paths = IGNORE({ ignore: ['*', '!*.js'] }).filter(paths);
                return Q.all(paths.map(function(path) {
                    var backup = path + options.backup;
                    FS.renameSync(path, backup);
                    return KrasotaAPI({
                        input: backup,
                        output: path,
                        beautifiers: options.beautifiers
                    }).then(function(res) {
                        return 'Krasota for ' + path;
                    });
                })).then(function(res) { return res.join('\n') })
            });
};

};
