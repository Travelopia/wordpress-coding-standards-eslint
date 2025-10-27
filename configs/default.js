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
	}
};
