import { createWebHashHistory, createRouter } from 'vue-router'
import Home from '../views/home.vue'

const routes = import.meta.glob('../views/*.vue')

console.log(routes, 'routes')

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
    routerList.push({
        path: getPath(item),
        component: routes[item]
    })
}


const router = createRouter({
    history: createWebHashHistory(),
    routes: routerList
})

export default router