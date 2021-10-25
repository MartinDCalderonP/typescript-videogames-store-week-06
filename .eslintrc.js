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
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'react/prop-types': 'off',
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		semi: ['error', 'always'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
