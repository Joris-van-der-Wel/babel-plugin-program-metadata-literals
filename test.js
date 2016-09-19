'use strict';

const {describe, it} = require('mocha-sugar-free');
const {assert} = require('chai');
const babel = require('babel-core');

const programMetadataLiteralPlugin = require('./index');

describe('babel-plugin-program-metadata-literals', () => {
    it('should parse DirectiveLiteral nodes which contain a colon', () => {

        const script = `
        'use strict';
        'abc: def';
        'Foo:    Bar   Baz    ';
        'Foo: quux';
        'Empty:'

        function doStuff() {
            'Oof: Zab Rab';
            'Foo: quux';
        }
        `;

        const result = babel.transform(script, {plugins: [programMetadataLiteralPlugin]});

        assert.deepEqual(result.metadata.programMetaDataLiterals, [
            {key: 'abc', value: 'def'},
            {key: 'Foo', value: 'Bar   Baz'},
            {key: 'Foo', value: 'quux'},
            {key: 'Empty', value: ''},
            {key: 'Oof', value: 'Zab Rab'},
            {key: 'Foo', value: 'quux'},
        ]);
    })
});
