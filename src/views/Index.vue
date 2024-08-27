<template>
	<div>主页 </div>
	<button @click="router.push('/views/list')">跳转列表页</button>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Axios from 'axios'

const router = useRouter()

onMounted(async () => {
	const { data } = await Axios.post(
		`https://zhiheai-oa-test.feihe.com/web-api/manager/knowledgeBase/queryListByStatus`,
		{
			status: 0,
			pageNum: 1,
			pageSize: 10
		},
		{
			headers: {
				token: `ea112221678e4ed4a81ead54a60d3555`
			}
		}
	)
	console.log('不做任何处理', data.data.list[0].knowledgeId)
	console.log('BigInt接收', BigInt(data.data.list[0].knowledgeId))
	console.log('BigInt接收后转字符串', BigInt(data.data.list[0].knowledgeId).toString())

	// console.log('Index', 'Index页 onMounted')
})
</script>

<style scoped lang="scss"></style>
