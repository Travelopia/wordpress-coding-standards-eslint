module.exports = {
	meta: {
		type: 'layout',
		fixable: 'code',
		messages: {
			missingComment: 'The first line in a function must be a comment.'
		}
	},
	create( context ) {
		const sourceCode = context.getSourceCode();

		return {
			'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression': function( node ) {
				// If function body is not a block, skip this function.
				if ( node.body.type !== 'BlockStatement' ) {
					return;
				}

				const openingBraceLine = node.body.loc.start.line;
				const firstLineInBody = openingBraceLine + 1;
				const comments = sourceCode.getCommentsInside( node.body );
				const firstCommentInBody = comments.find( ( comment ) => comment.loc.start.line === firstLineInBody );

				// Check if the first line in the function body is a comment.
				if ( ! firstCommentInBody ) {
					context.report( {
						node: node.body,
						messageId: 'missingComment'
					} );
				}
			}
		};
	}
};
