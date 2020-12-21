import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import io from 'socket.io-client'

import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import moment from 'moment'
import router from './router'
import store from './store'
import AppSpinner from './components/spinner.vue'

import Toasted from 'vue-toasted'

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)
Vue.component('AppSpinner',AppSpinner)

Vue.use(Vuelidate)
Vue.use(Toasted)

Vue.filter('capitalize', function(value){
  if(value && typeof value === 'string'){
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return ''
})

Vue.filter('formatDate',function(value,formatType = 'LL'){
  if(!value) return ''
  return moment(value).format(formatType)
})

const socket = io('http://localhost:3001')

new Vue({
  data() {
    return {
      socket
    }
  },
  router,
  Vuelidate,
  store,
  render: h => h(App),
}).$mount('#app')
