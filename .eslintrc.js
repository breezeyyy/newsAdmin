module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/standard',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// 允许tab缩进
		'no-tabs': ['error', { allowIndentationTabs: true }],
		// 关闭indent检测
		indent: ['off', 2],
		// 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，要求使用拖尾逗号；
		'comma-dangle': ['error', 'always-multiline'],
		// 空格和tab允许混用 （vue标签属性展开）
		'no-mixed-spaces-and-tabs': 'off',
		// 未使用的参数警告
		'no-unused-vars': 'warn',
	},
}
