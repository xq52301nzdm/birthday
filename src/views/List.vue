<template>
	<div>列表页 </div>
	<button @click="Router.push('/views/home')">跳转home页</button>
	<h2>{{ count }}</h2>
	<button @click="addCount">ID自增</button>
	<button @click="unMountWidget">卸载组件</button>
</template>
<script setup lang="ts">
import { createApp, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Router from '../router/index'

const props = defineProps<{
	count: number
	onChange: (v: number) => void
}>()

const count = ref(props.count)
const addCount = () => {
	count.value = count.value + 1
	props.onChange(count.value)
}

console.log(props, 'props')

const router = useRouter()
console.log('🚀 ~ router:', router)

const unMountWidget = () => {
}

defineExpose({
	addCount
})

onMounted(async () => {
	console.log('List', 'List页 onMounted')
})
</script>

<style scoped lang="scss"></style>
