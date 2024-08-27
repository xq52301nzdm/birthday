<template>
	<div class="main-root">
		<router-view v-slot="{ Component }">
			<transition>
				<keep-alive :include="[store.cachedNameList]">
					<component :is="Component" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouterCacheConfigStore } from '../store'
const store = useRouterCacheConfigStore()

console.log(store.cachedNameList, 'store.cachedNameList')
</script>

<style scoped lang="scss">
.main-root {
	flex: 1;
	height: 100%;
}
</style>
