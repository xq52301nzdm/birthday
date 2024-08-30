import { createWebHashHistory, createRouter } from 'vue-router'
import Home from '../views/home.vue'
import { useRouterCacheConfigStore } from '../store/index'

const routes = import.meta.glob('../views/*.vue')

// console.log(routes, 'routes')

const routerList = [
    {
        path: `/`,
        component: Home
    }
]

const getPath = (filePath: string) => {
    return filePath.replace(`../`, '/').replace('.vue', '')
}

for (let item in routes) {
    console.log(routes[item].name)
    routerList.push({
        path: getPath(item),
        component: routes[item]
    })
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: routerList
})


let historyStack: string[] = []; // 用于记录路由的历史栈

router.beforeEach(async (to, from) => {
    const store = useRouterCacheConfigStore()
    console.log("🚀 ~ router.beforeEach ~ to, from:", to, from)
    const isForward = historyStack.length === 0 || to.path !== historyStack[historyStack.length - 2];

    if (isForward) {
        console.log(`前进`)
        if (from.fullPath === `/views/index`) {
            store.addCachedNameList('Index')
        }
        historyStack.push(to.path); // 更新历史栈
    } else {
        console.log(`后退`)
        if (from.fullPath === `/views/index`) {
            store.deleteCachedNameList('Index')
        }
        historyStack.pop();
    }


    // if (to.fullPath === `/views/index`) {
    //     store.deleteCachedNameList('Index')
    // }
})

router.afterEach((to, from) => {

})

export default router