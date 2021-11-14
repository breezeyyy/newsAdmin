import axios from '@/plugin/axios'

const state = {
	tableData: [],
	dialogVisible: false,
	dialogData: {},
	prev: false,
	lengthData: 0,
}
const actions = {
	nopass: ({
		state,
		commit,
	}, {
		_limit,
		qSearch,
		q,
		_page,
	} = {}) => {
		axios({
			url: '/news/home',
			params: {
				_limit,
				q,
				qSearch,
				_page,
			},
		}).then(res => {
			commit('nopass', res.data)
		})
	},
	passAudit: ({
		state,
		commit,
	}, {
		id,
		update,
	} = {}) => {
		axios({
			url: `/audit/home/${id}`,
			params: { update },
		})
	},
	listLength: ({
		state,
		commit,
	}, {
		qSearch,
		q,
	} = {}) => {
		axios({
			url: '/count/home',
			params: {
				q,
				qSearch,
			},
		}).then(res => {
			commit('listLength', res.data)
		})
	},
	deleteData: ({
		state,
		commit,
	}, {
		sets,
		id,
	}) => {
		axios({
			url: `/delete/${sets}/${id}`,
			method: 'delete',
		}).then(() => {
			state.tableData.splice(state.tableData.findIndex(val => val._id === id), 1)
		})
	},
}
const mutations = {
	nopass: (state, payload) => {
		if (payload.err) {
			console.log(payload.title)
		} else {
			state.tableData = payload.data
		}
	},
	// 分页的总页数
	listLength: (state, payload) => (state.lengthData = payload.data),
	dialogVisible: (state, payload) => (state.dialogVisible = payload),
	prev: (state, payload) => (state.prev = payload),
	tableChange: (state, payload) => {
		state.tableData[state.tableData.findIndex(val => val._id === payload.id)].audit = payload.data
		state.tableData = state.tableData.sort((a, b) => a.audit > b.audit ? 0 : -1)
	},
	dialogShow: (state, payload) => (state.dialogData = state.tableData[state.tableData.findIndex(val => val._id === payload)]),
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
