import store from '../store'
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
            path:'/meetups/screte',
            name:'SecretePage',
            component:()=>import('../pages/SecretePage.vue'),
            meta:{
                onlyAuthUser:true
            }
           
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
            path:'/register',
            name:'Register',
            component:()=>import('../pages/Register.vue')
        },
        {
            path:'/login',
            name:'Login',
            component:()=>import('../pages/Login.vue')
        },
        {
            path:'/notfound',
            name:'MeetupNotFound',
            component:()=>import('../pages/NotFoundPage.vue')
        },
        {
            path:'*',
            name:'PageNotAuth',
            component:()=>import('../pages/PageNotAuth.vue')
        },
        
    ],
    mode:'history'
})

router.beforeEach((to,from,next)=>{
    store.dispatch('getAuthUser')
    .then(authUser =>{
        if(to.meta.onlyAuthUser){
            if(store.getters['isAuthenticated']){
                next()
            }else{
                next('/notfound')
            }
            
        }else{
            next()
        }
        
    })
})

export default router;