import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import './plugin/axios.js'
import Time from './utils/formatTime'
import './plugin/element-ui.js'

Vue.config.productionTip = false
Vue.prototype.$Time = Time

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
