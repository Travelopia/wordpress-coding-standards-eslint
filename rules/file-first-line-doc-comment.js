module.exports = {
	meta: {
		type: 'layout',
		fixable: 'code',
		messages: {
			missingComment: 'A file must contain a DocBlock as its first line.'
		}
	},
	create: function( context ) {
		return {
			Program: function( node ) {
				const comments = context.getSourceCode().getAllComments();

				if ( comments.length === 0 ) {
					context.report( {
						node,
						messageId: 'missingComment'
					} );
				} else {
					const firstComment = comments[ 0 ];
					const isFirstCommentOnFirstLine = firstComment.loc.start.line === 1;

					if ( firstComment.type !== 'Block' || ! firstComment.value.startsWith( '*' ) || ! isFirstCommentOnFirstLine ) {
						context.report( {
							node,
							messageId: 'missingComment'
						} );
					}
				}
			}
		};
	}
};
