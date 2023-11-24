import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "layout",
        component: () => import("@/layout/index.vue"),
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "/home",
                meta: {
                    tabName: "home"
                },
                component: () => import("@/views/home/index.vue")
            }
        ]
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
