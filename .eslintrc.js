module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		semi: ['error', 'always'],
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
