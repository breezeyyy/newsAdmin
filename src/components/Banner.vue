<template>
	<el-main>
		<el-table :data="tableData">
			<el-table-column
				v-slot="scope"
				label="日期"
				width="140"
			>
				{{ $Time(scope.row.time) }}
			</el-table-column>
			<el-table-column
				prop="detail.auth"
				label="作者"
				width="180"
			/>
			<el-table-column
				prop="title"
				label="标题"
				width="300"/>
			<el-table-column
				label="图片"
				v-slot="scope"
			>
				<el-image
					style="width: 240px"
					:src="scope.row.banner"
				></el-image>
			</el-table-column>
			<el-table-column
				label="操作"
				width="170"
				v-slot="scope"
			>
				<el-row>
					<el-button type="warning">编辑</el-button>
					<el-button
						type="danger"
						@click="deleteData($event,scope.row._id)"
					>删除
					</el-button>
				</el-row>
			</el-table-column>
		</el-table>
	</el-main>
</template>

<script>

	export default {
		name: 'banner',
		data () {
			return {
				tableData: [],
			}
		},
		beforeMount () {
			this.$axios({
				url: '/news/banner',
			}).then(res => {
				res.data.err || (this.tableData = res.data.data)
			})
		},
		methods: {
			deleteData (eve, id) {
				this.$axios({
					url: `/delete/banner/${id}`,
					method: 'delete',
				}).then(res => {
					res.data.err || this.tableData.splice(this.tableData.findIndex(val => val._id === id), 1)
				})
			},
		},
	}
</script>

<style scoped>

</style>
