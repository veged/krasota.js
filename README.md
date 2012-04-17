## What is this?

krasota.js is trying to save the world.
It provides the ability to carry out the syntactic transformation JavaScript code.
Conversions can be both for the protection coding style, and for more complex refactorings logic.

## How to use?

### Command-line

*Note:* For using from command-line you should install it globally -- `npm install -g krasota`.

```
$ krasota --help

Usage:
  krasota [OPTIONS]


Options:
  -h, --help : Help
  -v, --version : Version
  -i INPUT, --input=INPUT : Input file (default: stdin)
  -o OUTPUT, --output=OUTPUT : Output file (default: stdout)
  -b BEAUTIFIERS, --beautifier=BEAUTIFIERS : Local or global path to beautifier module, can be used many times
```

Examples:

```
$ krasota -i tests/split-vars.js -b krasota/lib/beautifiers/split-vars
$ krasota -i tests/join-vars.js -b krasota/lib/beautifiers/trailing-whitespaces -b krasota/lib/beautifiers/join-vars
$ krasota -i my-file.js -o my-beauty-file.js -b ./local/path/to/my/beautifier
```

### API

*Note:* If you are using `krasota` _programatically_ you should not install it globally, it's enough to declare depends in `package.json`.

#### COA

Because of using [COA](https://github.com/veged/coa/) all command-line interface available through `require('krasota').COA`.
Example:

```javascript
require('krasota').COA
    .invoke({
        input: 'tests/join-vars.js',
        beautifiers: [ 'lib/beautifiers/trailing-whitespaces', 'krasota/lib/beautifiers/join-vars' ]
    })
```

#### OMeta

You can use `krasota` through the `require('krasota')` in terms of raw [OmetaJS](https://github.com/veged/ometa-js/)-grammas.
Take a look to the [tests/tests.js](tests/tests.js#L11) for example of usage.

## Which beautifiers are available?

There are some proof-of-concept beautifiers:

* [krasota/lib/beautifiers/always-semicolons](lib/beautifiers/always-semicolons.ometajs) -- force insert semicolons
* [krasota/lib/beautifiers/join-vars](lib/beautifiers/join-vars.ometajs) -- join multiply consecutive `var` statements into one `var` statement with multiply assigns
* [krasota/lib/beautifiers/split-vars](lib/beautifiers/split-vars.ometajs) -- split `var` statements with multiply assigns into multiply consecutive `var` statements
* [krasota/lib/beautifiers/trailing-whitespaces](lib/beautifiers/trailing-whitespaces.ometajs) -- remove trailing whitespaces

## Tests

Run `make tests` for tests. For development version tests run `make tests ENV=development`.

## Other projects
* https://github.com/olov/jsshaper
* https://github.com/mishoo/UglifyJS
* http://boshi.inimino.org/3box/PanPG/about.html
* https://github.com/kangax/kratko.js
* https://github.com/substack/node-burrito
* http://esprima.org/
* https://github.com/fawek/codepainter

## Links
* https://developer.mozilla.org/en/SpiderMonkey/Parser_API
* http://boshi.inimino.org/3box/PanPG/js_pp/src/js_ast.js
* http://boshi.inimino.org/3box/asof/1269629763069/PEG/ECMAScript_unified.peg
* http://code.google.com/p/es-lab/source/browse/trunk/src/parser/es5parser.ojs
