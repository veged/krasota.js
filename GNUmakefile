ENV=production

all: lib

lib: $(patsubst %.ometajs,%.js,$(wildcard lib/krasota/*.ometajs))

%.js: %.ometajs
	ometajs2js -i $< -o $@

tests: test $(subst tests/tests,,$(subst .js,,$(wildcard tests/*.js)))


tests/%:
	@KRASOTA_ENV=$(ENV) node tests/tests.js tests/$*.js

test:
	mocha

.PHONY: all tests test
