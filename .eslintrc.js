module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
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
