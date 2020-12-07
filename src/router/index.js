import vue from 'vue'
import Router from 'vue-router'

vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'/',
            name:'PageHome',
            component:()=>import('../pages/PageHome.vue')
        },
        {
            path:'/meetups/:id',
            name:'MeetupDetails',
            component:()=>import('../pages/MeetupDetail.vue')
        },
        {
            path:'/find',
            name:'MeetupFinder',
            component:()=>import('../pages/MeetupFind.vue')
        },
        {
            path:'*',
            name:'MeetupNotFound',
            component:()=>import('../pages/NotFoundPage.vue')
        }
    ],
    mode:'history'
})

export default router;