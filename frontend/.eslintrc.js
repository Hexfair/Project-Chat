const prettierConfig = require("./.prettierrc.js");

module.exports = {
	"root": true,
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"semi": "off",
		"@typescript-eslint/semi": [
			"warn"
		],
		"@typescript-eslint/no-empty-interface": [
			"error",
			{
				"allowSingleExtends": true
			}
		]
	},
	"extends": [
		"next/core-web-vitals",
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended"
	]
};