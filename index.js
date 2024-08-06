module.exports = {
	configs: {
		'default': require( './configs/default' ),
	},
	rules: {
		'comment-before-code-block': require( './rules/comment-before-code-block' ),
		'first-line-function-comment': require( './rules/first-line-function-comment' ),
		'comment-before-return': require( './rules/comment-before-return' ),
		'empty-line-before-comment': require( './rules/empty-line-before-comment' ),
		'empty-line-before-control': require( './rules/empty-line-before-control' ),
		'file-first-line-doc-comment': require( './rules/file-first-line-doc-comment' ),
	},
};
