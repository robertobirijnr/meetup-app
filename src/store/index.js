import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        categories:[],
        meetups:[],
        meetupById:{},
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
         },

         fetchMeetupsDetail({commit},meetupId){
            axios.get(`/api/v1/meetups/${meetupId}`)
            .then(response=>{
               commit("SET_MEETUP_DETAILS",response.data)
            })
            .catch(err=>{
                alert(err)
            })
         },
         fetchThreads({commit},meetupId){
            axios.get(`/api/v1/threads?meetupId=${meetupId}`)
            .then(response=>{
             commit("SET_MEETUP_THREADS",response.data)
            })
            .catch(err=>{
                alert(err)
            })
         },
         fetchMeetup({commit}){
            axios.get('/api/v1/meetups')
            .then(res => {
             commit("SET_MEETUP",res.data)
            })
         }
     },
    

    mutations:{
        SET_MEETUPS(state,meetups){
            state.meetups = meetups
        },
        SET_CATEGORIES(state,categories){
            state.categories = categories
        },
        SET_MEETUP_DETAILS(state,meetupBy){
            state.meetupById = meetupBy
        },
        SET_MEETUP_THREADS(state,threads){
            state.threads = threads
        },
        SET_MEETUP(state,meetup){
            state.meetup = meetup
        }
    }
})