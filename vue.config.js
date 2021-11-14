module.exports = {
	publicPath: '/admin',
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost',
				changeOrigin: true, // 创建虚拟服务器
				ws: true, // websocket代理
			},
		},
	},
}
