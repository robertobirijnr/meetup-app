import axios from 'axios'
import axiosInstance from '../../service/axios'
import Vue from 'vue'
import { applyFilters } from '../../helpers'

export const state ={
    meetups:[],
    meetupById:{},
    meetup: []
}

export const actions ={
    fetchMeetups({state,commit},options={}){
     const url = applyFilters('/api/v1/meetups',options.filter)

      return  axios.get(url)
        .then(response =>{
            commit('SET_MEETUPS',response.data)
            return state.meetups
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
     createMeetup({rootState},formData){
        //  return axios.post('/api/v1/meetup')
        formData.meetupCreator = rootState.auth.user
        formData.processedLocation  = formData.location.toLowerCase().replace(/[\s,]+/g,'').trim()

        return axiosInstance.post('/api/v1/meetups',formData)
        .then(res =>{
            res.data
        })
     },
     joinMeetup({state,rootState,commit,dispatch},meetupId){
         const user = rootState.auth.user

         return axiosInstance.post(`/api/v1/meetups/${meetupId}/join`)
         .then(res=>{
             dispatch('addMeetupToAuthUser',meetupId,{root: true})

             const joinedPeople = state.meetup.joinedPeople
             commit('adduserToMeetup',[...joinedPeople,user])
             return true
         })
     },
     leaveMeetup({state,rootState,commit,dispatch},meetupId){
         const user = rootState.auth.user

         return axiosInstance.post(`/api/v1/meetups/${meetupId}/leave`)
         .then(()=>{
             dispatch('removeMeetupFromAuthUser',meetupId,{root:true})

             const joinedPeople = state.meetup.joinedPeople
             const index = joinedPeople.findIndex(Joinuser => Joinuser._id === user._id)
             joinedPeople.splice(index,1)
             commit('adduserToMeetup',joinedPeople)
         })
     },
     updateMeetups({commit,state},meetupData){
        meetupData.processedLocation  = meetupData.location.toLowerCase().replace(/[\s,]+/g,'').trim()
         return axiosInstance.patch(`/api/v1/meetups/${meetupData._id}`,meetupData)
         .then(res=>{
             const updatedMeetup = res.data
             commit('mergeMeetup',updatedMeetup)
             return state.meetup
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
    },
    adduserToMeetup(state,joinedPeople){
        Vue.set(state.meetup, 'joinedPeople', joinedPeople)
    },
    mergeMeetup(state,updatedMeetup){
        state.meetup = {...state.meetup, ...updatedMeetup}
    }
}