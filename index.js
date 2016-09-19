'use strict';

// foo: Bar baz
const metaFormat = /^\s*([^:]+?)\s*:\s*(.*?)\s*$/;

function DirectiveVisitor(path, {file}) {
    const {node} = path;
    const {metadata} = file;

    if (!metadata.programMetaDataLiterals) {
        metadata.programMetaDataLiterals = [];
    }

    const programMetaData = metadata.programMetaDataLiterals;

    let matches;

    if (node.value &&
        node.value.type === 'DirectiveLiteral' &&
        (matches = metaFormat.exec(node.value.value))
    ) {
        const [, key, value] = matches;
        programMetaData.push({key, value});
        path.remove();
    }
}

module.exports = () => ({
    visitor: {
        Directive: DirectiveVisitor,
    },
});
