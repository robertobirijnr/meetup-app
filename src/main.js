import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'

import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import moment from 'moment'
import router from './router'
import store from './store'
import AppSpinner from './components/spinner.vue'
import AppSocket from './plugins/socketPlugin'

import Toasted from 'vue-toasted'

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)
Vue.component('AppSpinner',AppSpinner)

Vue.use(Vuelidate)
Vue.use(Toasted)

const connection = process.env.VUE_APP_URI 

Vue.use(AppSocket,{connection})

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

Vue.filter('FromNow',(value)=>{
  if(!value) return ''

  return moment(value).fromNow()
})



new Vue({
  router,
  Vuelidate,
  store,
  render: h => h(App),
}).$mount('#app')
