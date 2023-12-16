module.exports = {
	extends: [
		'neoncitylights/typescript',
	],
	ignorePatterns: [
		'dist',
	],
	rules: {
		'@typescript-eslint/semi': 'off',
		'security/detect-non-literal-fs-filename': 'off',
	},
};
