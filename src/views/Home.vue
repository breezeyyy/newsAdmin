<template>
	<div class="home">
		<el-container>
			<el-header style="font-size: 12px;background-color: #FFF;">
				<h1 style="margin:0;line-height: 60px; float:left">NEWS新闻管理系统</h1>
				<el-dropdown style="float:right">
					<i
						class="el-icon-setting"
						style="margin-right: 15px"
					></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>个人中心</el-dropdown-item>
						<el-dropdown-item>注销</el-dropdown-item>
					</el-dropdown-menu>
					<span>叶俊杰</span>
				</el-dropdown>
			</el-header>
		</el-container>
		<el-container style="height: 635px; border: 1px solid #EEE">
			<el-aside
				width="200px"
				style="background-color: rgb(238, 241, 246)">
				<el-menu
					default-active="1-1-2"
					:unique-opened="true"
				>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>首页</template>
						<el-menu-item-group>
							<el-submenu index="1-1">
								<template slot="title">新闻管理</template>
								<el-menu-item
									index="1-1-1"
									@click="comp='PassNews'"
								>已审核</el-menu-item>
								<el-menu-item
									@click="comp='PendingNews'"
									index="1-1-2"
								>待审核</el-menu-item>
								<el-menu-item
									@click="comp='NotPassNews'"
									index="1-1-3"
								>审核未通过</el-menu-item>
							</el-submenu>
							<el-menu-item
								index="1-2"
								@click="comp='Banner'"
							>轮播图</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
			</el-container>
			<component :is="comp"></component>
		</el-container>
	</div>
</template>

<script>
	import Banner from '../components/Banner'
	import NotPassNews from '../components/NotPassNews'
	import PassNews from '../components/PassNews'
	import PendingNews from '../components/PendingNews'
	export default {
		name: 'Home',
		data () {
			return {
				comp: 'PendingNews',
			}
		},
		components: {
			Banner,
			NotPassNews,
			PassNews,
			PendingNews,
		},
	}

</script>
<style>
</style>
