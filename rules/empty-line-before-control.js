module.exports = {
	meta: {
		type: 'suggestion',
		fixable: 'whitespace',
		messages: {
			missingEmptyLine: 'An empty line is required before a control structure.'
		}
	},
	create( context ) {
		const sourceCode = context.getSourceCode();

		return {
			'ForStatement, IfStatement, WhileStatement, TryStatement': function( node ) {
				// If it's an 'IfStatement' as a part of 'else if', don't enforce the rule.
				if ( node.type === 'IfStatement' && isPartOfElseIf( node, sourceCode ) ) {
					return;
				}

				const tokenBefore = sourceCode.getTokenBefore( node, { includeComments: true } );
				const statementLine = node.loc.start.line;

				// Check if there's a comment line before the statement
				if ( ! tokenBefore || ! ( tokenBefore.loc.end.line === statementLine - 1 && ( tokenBefore.type === 'Line' || tokenBefore.type === 'Block' ) ) ) {
					context.report( {
						node,
						messageId: 'missingEmptyLine'
					} );
				}
			}
		};
	}
};

function isPartOfElseIf( node, sourceCode ) {
	const prevToken = sourceCode.getTokenBefore( node );

	return prevToken &&
		prevToken.type === 'Keyword' &&
		prevToken.value === 'else' &&
		prevToken.loc.start.line === prevToken.loc.end.line &&
		prevToken.loc.end.line === node.loc.start.line;
}
