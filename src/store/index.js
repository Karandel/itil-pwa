import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainNavbarState: {title: 'ALP ITIL mobile', returnButton: false},
    serverCallInProgress: false,
    pageContent: {},
    currentTicketNumber: '',
    previousRoute: {
      name: '',
      path: ''
    },
    generalErrorMsg: '',
    serverCallErrorDescription: ''
  },
  actions,
  mutations
})
