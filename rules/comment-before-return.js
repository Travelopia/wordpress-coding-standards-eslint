module.exports = {
	meta: {
		type: 'layout',
		fixable: 'code',
		messages: {
			missingCommentLine: 'A comment is required before a return statement.'
		}
	},
	create( context ) {
		const sourceCode = context.getSourceCode();

		return {
			'ReturnStatement': function( node ) {
				const tokenBefore = sourceCode.getTokenBefore( node, { includeComments: true } );
				const returnLine = node.loc.start.line;

				// Check if there's a comment line before the return statement.
				if ( ! tokenBefore || ! ( tokenBefore.type === 'Line' || tokenBefore.type === 'Block' ) || tokenBefore.loc.end.line !== returnLine - 1 ) {
					context.report( {
						node,
						messageId: 'missingCommentLine'
					} );
				}
			}
		};
	}
};
