module.exports = {
	plugins: [ '@travelopia/wordpress-coding-standards' ],
	extends: 'plugin:@wordpress/eslint-plugin/recommended-with-formatting',
	overrides: [
		{
			'files': [ '*.ts', '*.tsx' ],
			'rules': {
				'no-undef': 'off',
				'no-unused-vars': 'off',
				'import/named': 'off',
				'import/no-unresolved': 'off',
				'import/no-extraneous-dependencies': 'off'
			}
		}
	],
	rules: {
		'react-hooks/rules-of-hooks': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'@travelopia/wordpress-coding-standards/comment-before-code-block': 'error',
		'@travelopia/wordpress-coding-standards/first-line-function-comment': 'error',
		'@travelopia/wordpress-coding-standards/comment-before-return': 'error',
		'@travelopia/wordpress-coding-standards/empty-line-before-comment': 'error',
		'@travelopia/wordpress-coding-standards/empty-line-before-control': 'error',
		'@travelopia/wordpress-coding-standards/file-first-line-doc-comment': 'error',
	}
};
