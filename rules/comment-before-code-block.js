module.exports = {
	meta: {
		type: 'layout',
		fixable: 'code',
		messages: {
			missingComment: 'A comment is required before a code block.'
		}
	},
	create( context ) {
		const sourceCode = context.sourceCode;
		const allLines = sourceCode.lines[ sourceCode.lines.length - 1 ] === '' ? sourceCode.lines.slice( 0, -1 ) : sourceCode.lines;
		const templateLiteralLines = new Set();

		return {
			TemplateLiteral( node ) {
				node.quasis.forEach( ( literalPart ) => {
					// Empty lines have a semantic meaning if they're inside template literals. Don't count these as empty lines.
					for ( let ignoredLine = literalPart.loc.start.line; ignoredLine < literalPart.loc.end.line; ignoredLine++ ) {
						templateLiteralLines.add(ignoredLine);
					}
				} );
			},
			'Program:exit'( node ) {
				return allLines

					// Given a list of lines, first get a list of line numbers that are empty.
					.reduce( ( emptyLineNumbers, line, index ) => {
						if ( ! line.trim() && ! templateLiteralLines.has( index + 1 ) ) {
							emptyLineNumbers.push(index + 1);
						}
						return emptyLineNumbers;
					}, [] )

					// For each empty line number, check the next line to see if it's a comment.
					.forEach( ( lineNumber ) => {
						const nextLine = allLines[ lineNumber ]; // because arrays are 0-indexed

						// If the next line is not a comment, report an error.
						if ( ! nextLine || ( ! nextLine.trim().startsWith( '//' ) && ! nextLine.trim().startsWith( '/**' ) ) ) {
							context.report( {
								node,
								loc: {
									start: { line: lineNumber + 1, column: 0 },
									end: { line: lineNumber + 1, column: 0 }
								},
								messageId: 'missingComment',
								fix( fixer ) {
									const rangeStart = sourceCode.getIndexFromLoc( { line: lineNumber + 1, column: 0 } );
									const rangeEnd = sourceCode.getIndexFromLoc( { line: lineNumber + 2, column: 0 } );
									const comment = "// TODO: Add comment.\n";

									return fixer.insertTextBeforeRange( [ rangeStart, rangeEnd ], comment );
								}
							} );
						}
					} );
			}
		};
	}
};
