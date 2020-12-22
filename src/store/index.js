import Vue from 'vue'
import Vuex from 'vuex'
import * as meetups from './modules/meetups'
import * as thread from './modules/thread'
import * as categories from './modules/categories'
import * as auth from './modules/auth'
import * as stats from './modules/stats'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        meetups,
        categories,
        thread,
        auth,
        stats
    }
})