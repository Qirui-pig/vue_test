import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes:[
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component: ()=>import ('../components/login/Login.vue')
    },
    {
      path:'/home',
      component: ()=>import ('../view/Home/Home.vue'),
      redirect:'/welcome',
      children:[{
        path:'/welcome',
        component:()=>import ('../view/Home/Main/Welcome.vue')
      },
      {
        path:'/users',
        component:()=>import ('../view/Home/Main/Users.vue')
      },
      {
        path:'/rights',
        component:()=>import ('../view/Home/Main/Power/Rights.vue')
      },
      {
        path:'/roles',
        component:()=>import ('../view/Home/Main/Power/Roles.vue')
      }
    ]
    }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{

  if(to.path === '/login') return next()

  const strToken = window.sessionStorage.getItem('token')

  if(!strToken) return next('/login')
  next()

})

export default router