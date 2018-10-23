// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import ALP_ITIL_API from '@/services/ALP_ITIL_API'

sync(store, router)

const moment = require('moment')
require('moment/locale/ru')

Vue.use(require('vue-moment'), {
  moment
})

Vue.prototype.$defaultDateTimeFormat = 'DD MMM YYYY HH:mm'

Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan.base
  }
})

Vue.config.productionTip = false

Vue.prototype.$ALP_ITIL_API = new ALP_ITIL_API()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
