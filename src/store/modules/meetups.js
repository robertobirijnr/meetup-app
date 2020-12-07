import axios from 'axios'
import Vue from 'vue'

export const state ={
    meetups:[],
    meetupById:{},
    meetup: []
}

export const actions ={
    fetchMeetups({commit}){
        axios.get('/api/v1/meetups')
        .then(response =>{
            commit('SET_MEETUPS',response.data)
        })
        .catch(err =>{
            console.log(err)
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
     fetchMeetup({commit}){
        axios.get('/api/v1/meetups')
        .then(res => {
         commit("SET_MEETUP",res.data)
        })
     }
}

export const mutations ={
    SET_MEETUPS(state,meetups){
        state.meetups = meetups
    },
    SET_MEETUP_DETAILS(state,meetupBy){
        state.meetupById = meetupBy
    },
    SET_MEETUP(state,meetup){
        state.meetup = meetup
    }
}