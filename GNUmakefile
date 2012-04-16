ENV=production

JS4OMETA = $(patsubst %.ometajs,%.js,$(wildcard lib/krasota/*.ometajs lib/krasota/beautifiers/*.ometajs))

all: lib

lib: $(JS4OMETA)

%.js: %.ometajs
	ometajs2js -i $< -o $@

tests: test $(subst tests/tests,,$(subst .js,,$(wildcard tests/*.js)))


tests/%:
	@KRASOTA_ENV=$(ENV) node tests/tests.js tests/$*.js

test:
	mocha

clean:
	-rm $(JS4OMETA) tests/*.result

.PHONY: all tests test
