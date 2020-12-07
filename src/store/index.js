import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        categories:[],
        meetups:[],
        meetupdetail:{},
        threads:[],
        meetup: []
    },

    getters:{
       
    },

    actions:{
        fetchMeetups({commit}){
            axios.get('/api/v1/meetups')
            .then(response =>{
                commit('SET_MEETUPS',response.data)
            })
            .catch(err =>{
                console.log(err)
            })

            },
        fetchCategories({commit}){
            axios.get('/api/v1/categories')
            .then(response =>{
                commit("SET_CATEGORIES",response.data)
            })
            .catch(err=>{
                alert(err)
            })
            }
        },
    

    mutations:{
        SET_MEETUPS(state,meetups){
            state.meetups = meetups
        },
        SET_CATEGORIES(state,categories){
            state.categories = categories
        }
    }
})