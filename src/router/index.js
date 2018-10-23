import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import TicketList from '@/components/TicketList'
import TicketView from '@/components/TicketView'
import TicketAvaliableStatuses from '@/components/TicketAvaliableStatuses'
import TicketComments from '@/components/TicketComments'
import TicketAddComment from '@/components/TicketAddComment'
import UserView from '@/components/UserView'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'TicketList',
      component: TicketList
    },
    {
      path: '/tickets/:ticketNumber',
      name: 'TicketView',
      component: TicketView
    },
    {
      path: '/tickets/:ticketNumber/newStatus',
      name: 'TicketAvaliableStatuses',
      component: TicketAvaliableStatuses
    },
    {
      path: '/tickets/:ticketNumber/comments',
      name: 'TicketComments',
      component: TicketComments
    },
    {
      path: '/tickets/:ticketNumber/comments/add',
      name: 'TicketAddComment',
      component: TicketAddComment
    },
    {
      path: '/user/:name',
      name: 'UserView',
      component: UserView
    }
  ]
})

export default router
