module.exports = {
	meta: {
		type: 'layout',
		fixable: 'whitespace',
		messages: {
			missingEmptyLine: 'An empty line is required before a comment.'
		}
	},
	create( context ) {
		const sourceCode = context.getSourceCode();

		return {
			'Program:exit': function( node ) {
				const comments = sourceCode.getAllComments();

				for ( const comment of comments ) {
					// Ignore comments at the top of the file.
					if ( comment.loc.start.line === 1 ) {
						continue;
					}

					const tokenBefore = sourceCode.getTokenBefore( comment, { includeComments: true } );

					// Ignore if the previous line contains an opening curly brace.
					const prevLine = sourceCode.lines[ comment.loc.start.line - 2 ];
					if ( prevLine && prevLine.includes( '{' ) ) {
						continue;
					}

					// Check if there's an empty line before the comment.
					if ( tokenBefore.loc.end.line === comment.loc.start.line - 1 ) {
						context.report( {
							node: comment,
							messageId: 'missingEmptyLine'
						} );
					}
				}
			}
		};
	}
};
