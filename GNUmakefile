ENV=development

all: lib

src: $(patsubst %.ometajs,%.ometajs.js,$(wildcard src/*.ometajs))

%.ometajs.js: %.ometajs
	ometajs2js -i $< -o $@

lib: lib/krasota.js

lib/krasota.js: src
	-rm $@
	for i in \
			krasota.js \
			parser.ometajs.js \
			serializer.ometajs.js \
		; do \
			cat $</$$i >> $@ \
		; done

tests: $(subst tests/tests,,$(subst .js,,$(wildcard tests/*.js)))


tests/%:
	@KRASOTA_ENV=$(ENV) node tests/tests.js tests/$*.js

.PHONY: all tests
