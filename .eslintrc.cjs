module.exports = {
	root: true,
	extends: ['@nuxtjs/eslint-config-typescript'],
	rules: {
		'arrow-parens': ['warn', 'as-needed'],
		'arrow-spacing': ['off'],
		'block-spacing': ['off'],
		'brace-style': ['off'],
		'import/no-named-as-default': ['off'],
		'keyword-spacing': ['off'],
		'no-tabs': ['warn', { allowIndentationTabs: true }],
		'object-curly-spacing': ['off'],
		'object-property-newline': ['off'],
		'space-before-blocks': ['off'],
		'space-before-function-paren': ['off', 'never'],
		'space-infix-ops': ['off'],
		'vue/html-indent': ['warn', 'tab', { baseIndent: 0 }],
		'vue/max-attributes-per-line': ['off'],
		'vue/multi-word-component-names': ['off'],
		'vue/prop-name-casing': ['off'],
		'vue/singleline-html-element-content-newline': ['off'],
		camelcase: ['off'],
		curly: ['off'],
		indent: ['warn', 'tab'],
		semi: ['off']
	}
};
