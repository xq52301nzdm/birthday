<template>
	<div>列表页 </div>
    <button @click="router.push('/views/home')">跳转home页</button>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
	console.log('List', 'List页 onMounted')
})
</script>

<style scoped lang="scss"></style>
