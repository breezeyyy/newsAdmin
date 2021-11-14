import Vue from 'vue'
import Vuex from 'vuex'

// import noPassNews from '@/store/module/noPassNews'
import pendingNews from './module/pendingNews'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		// noPassNews,
		pendingNews,
	},
})
