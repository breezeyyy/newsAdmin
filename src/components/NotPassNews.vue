<template>
	<el-main>
		<el-table :data="tableData">
			<el-table-column v-slot="scope" label="日期" width="140">
				{{ $Time(scope.row.time) }}
			</el-table-column>
			<el-table-column prop="detail.auth" label="作者" width="100">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="240">
			</el-table-column>
			<el-table-column label="头像" width="100" v-slot="scope">
				<el-image
					style="width: 60px"
					:src="scope.row.detail.auth_icon"
				></el-image>
			</el-table-column>
			<el-table-column label="预览" v-slot="scope">
				<p v-html="scope.row.detail.content" class="content"></p>
			</el-table-column>
			<el-table-column label="状态" width="80" v-slot="scope">
				<span :class="{noAuditStyle:scope.row.audit==='未通过'}">{{ scope.row.audit }}</span>
			</el-table-column>
			<el-table-column label="操作" width="170" v-slot="scope">
				<el-row>
					<el-button type="warning" @click="dialogShow(scope.row._id)">详情</el-button>
					<el-button type="danger"
					           @click="$store.dispatch('pendingNews/deleteData',{sets:'home',id:scope.row._id})"
					>删除</el-button>
				</el-row>
			</el-table-column>
		</el-table>
		<!--    分页-->
		<el-pagination
			background
			layout="prev, pager, next"
			:total="lengthData"
			:page-size="10"
			@current-change="CurrentChange"
			style="text-align: center;margin-top:30px">
		</el-pagination>

		<el-dialog
			title="提示"
			:visible.sync="$store.state.pendingNews.dialogVisible"
			width="70%"
			:before-close="handleClose"
			v-if="prev"
		>
			<div id="dialog_content">
				<el-descriptions title="用户信息" :column=3>
					<el-descriptions-item label="作者">{{ dialogData.detail.auth }}</el-descriptions-item>
					<el-descriptions-item label="发布时间">{{ $Time(dialogData.time) }}</el-descriptions-item>
					<el-descriptions-item label="标题">{{ dialogData.title }}</el-descriptions-item>
				</el-descriptions>
				<p id="dialogP" v-html="dialogData.detail.content"></p>
			</div>
			<span slot="footer" class="dialog-footer" v-show="dialogData.audit==='未通过'">
        <el-button @click="$store.commit('pendingNews/dialogVisible',false)">取 消</el-button>
        <el-button type="primary" @click="audit(dialogData._id,'待审核')">加入待审核</el-button>
      </span>
			<span slot="footer" class="dialog-footer" v-show="dialogData.audit==='待审核'">
        <el-button @click="$store.commit('pendingNews/dialogVisible',false)">取 消</el-button>
        <el-button type="warning" @click="audit(dialogData._id,'未通过')">不通过</el-button>
        <el-button type="primary" @click="audit(dialogData._id,'已审核')">审核通过</el-button>
      </span>
		</el-dialog>
	</el-main>

</template>

<script>
	import { mapActions, mapState } from 'vuex'

	export default {
		name: 'NotPassNews',
		data () {
			return {
				checkAll: false,
				isIndeterminate: true,
			}
		},
		mounted () {
			this.nopass({
				_limit: 10,
				q: '未通过',
				qSearch: 'audit',
			})
			this.listLength({
				qSearch: 'audit',
				q: '未通过',
			})
		},
		methods: {
			...mapActions('pendingNews', ['nopass', 'passAudit', 'listLength', 'deleteData']),
			handleClose (done) {
				done()
			},
			dialogShow (id) {
				this.$store.commit('pendingNews/dialogVisible', true)
				this.$store.commit('pendingNews/dialogShow', id)
				this.$store.commit('pendingNews/prev', true)
			},
			audit (id, data) {
				this.passAudit({
					id,
					update: data,
				})
				this.$store.commit('pendingNews/dialogVisible', false)
				this.$store.commit('pendingNews/tableChange', {
					id,
					data,
				})
			},
			CurrentChange (val) {
				this.nopass({
					_limit: 10,
					q: '未通过',
					qSearch: 'audit',
					_page: val - 1,
				})
			},

		},
		computed: mapState('pendingNews', {
			tableData: state => state.tableData,
			dialogVisible: state => state.dialogVisible,
			prev: state => state.prev,
			dialogData: state => state.dialogData,
			lengthData: state => state.lengthData,
		}),

	}
</script>

<style scoped>
	.content {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		padding-right: 20px
	}

	#dialogP {
		font-size: 18px;
		line-height: 36px;
		padding: 0 20px;
		text-indent: 2em
	}

	.noAuditStyle {
		color: #F78989
	}
</style>
