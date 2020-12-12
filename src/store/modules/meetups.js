import axios from 'axios'
import Vue from 'vue'

export const state ={
    meetups:[],
    meetupById:{},
    meetup: []
}

export const actions ={
    fetchMeetups({commit}){
      return  axios.get('/api/v1/meetups')
        .then(response =>{
            commit('SET_MEETUPS',response.data)
        })
        .catch(err =>{
            console.log(err)
        })

     },
     fetchMeetupsDetail({commit},meetupId){
      return  axios.get(`/api/v1/meetups/${meetupId}`)
        .then(response=>{
           commit("SET_MEETUP_DETAILS",response.data)
        })
        .catch(err=>{
            alert(err)
        })
     },
     fetchMeetup({commit}){
      return  axios.get('/api/v1/meetups')
        .then(res => {
         commit("SET_MEETUP",res.data)
        })
     },
     createMeetup({commit},formData){
        //  return axios.post('/api/v1/meetup')
        console.log(formData)
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