<template>
	<div>主页 </div>
	<button @click="router.push('/views/list')">跳转列表页</button>

	<div id="area"> </div>
	<button @click="renderWidget">挂载组件</button>
	<button @click="unMountWidget">卸载组件</button>
	<button @click="useInstanceMethods">组件实例方法调用</button>
</template>
<script setup lang="ts">
import { onMounted, createApp, ref } from 'vue'
import { useRouter } from 'vue-router'
import Axios from 'axios'
import ListWidget from './List.vue'

const router = useRouter()

// onMounted(async () => {
// 	const { data } = await Axios.post(
// 		`https://zhiheai-oa-test.feihe.com/web-api/manager/knowledgeBase/queryListByStatus`,
// 		{
// 			status: 0,
// 			pageNum: 1,
// 			pageSize: 10
// 		},
// 		{
// 			headers: {
// 				token: `ea112221678e4ed4a81ead54a60d3555`
// 			}
// 		}
// 	)
// 	console.log('不做任何处理', data.data.list[0].knowledgeId)
// 	console.log('BigInt接收', BigInt(data.data.list[0].knowledgeId))
// 	console.log('BigInt接收后转字符串', BigInt(data.data.list[0].knowledgeId).toString())

// 	// console.log('Index', 'Index页 onMounted')
// })

const app = ref(null)
const appInstance = ref(null)

const useInstanceMethods = () => {
	appInstance.value!.addCount()
}

const renderWidget = () => {
	let num = 0
	app.value = createApp(ListWidget, {
		count: 20,
		onChange(v: number) {
			num = v
		}
	})
	appInstance.value = app.value.mount(document.querySelector(`#area`)!)
}

const unMountWidget = () => {
	console.log(app.value)
	app.value.unmount()
}
</script>

<style scoped lang="scss">
#area {
	width: 500px;
	height: 500px;
	border: 1px solid red;
}
</style>
