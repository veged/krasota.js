ENV?=production

JS4OMETA = $(patsubst %.ometajs,%.js,$(wildcard lib/*.ometajs lib/beautifiers/*.ometajs))

all: lib

lib: $(JS4OMETA)

%.js: %.ometajs
	./node_modules/ometajs/bin/ometajs2js -b -i $< -o $@

tests: test $(subst tests/tests,,$(subst .js,,$(wildcard tests/*.js))) tests/recursive


tests/%:
	@KRASOTA_ENV=$(ENV) node tests/tests.js tests/$*.js

tests/recursive:
	@KRASOTA_ENV=$(ENV) ./bin/krasota recursive -b krasota/lib/beautifiers/join-vars --backup='.back' $@
	@find tests/recursive -name '*.back' -delete
	@diff $@ $@.expect

#test:
#	mocha

clean:
	-rm $(JS4OMETA) tests/*.result

.PHONY: all tests test tests/recursive
