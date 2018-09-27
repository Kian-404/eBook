import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Ebook from '@/Ebook'
import BookShop from '@/BookShop'
import More from '@/components/More'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:BookShop,
      // redirect:'/ebook'
    },
    {
    	path:'/ebook',
    	component:Ebook
    },{
      path:'/more',
      component:More
    }
  ]
})
