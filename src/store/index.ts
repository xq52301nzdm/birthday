import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouterCacheConfigStore = defineStore('RouterCacheConfig', () => {
    const cachedNameList = ref<string[]>([])
    const addCachedNameList = (cachedName: string) => {
        cachedNameList.value.push(cachedName)
        console.log("🚀 ~ addCachedNameList ~ cachedNameList:", cachedNameList)
    }

    const deleteCachedNameList = (cachedName: string) => {
        cachedNameList.value = cachedNameList.value.filter(x => x !== cachedName)
    }

    return {
        cachedNameList,
        addCachedNameList,
        deleteCachedNameList
    }
})