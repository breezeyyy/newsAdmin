import Vue from 'vue'
import axios from 'axios'

axios.interceptors.request.use(config => {
	config.baseURL = '/api'
	return config
}, err => {
	return Promise.reject(err)
})

Vue.prototype.$axios = axios

export default axios
