import axios from 'axios'
import jwt from 'jsonwebtoken'
import axiosInstance from '../../service/axios'
import {rejectError} from '../../helpers'
import Vue from 'vue'


function checkTokenValidity(token){
    if(token){
        const decodedToken = jwt.decode(token)

        return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
    }

    return false
}



export const state ={
    user:null,
    isAuthenResolve:false
}

export const getters ={
    authUser(state){
        return state.user || null
    },
    isAuthenticated(state){
        return !!state.user
    },
    isMeetupOwner:(state)=>(meetupCreatorId) =>{
        if(!state.user) return false
        return state.user._id === meetupCreatorId
    },
    isMember:(state)=>(meetupId) =>{
        return state.user && 
        state.user['joinedMeetups']
         && state.user['joinedMeetups'].includes(meetupId)
    },
}

export const actions ={
    registerUser (context, userData) {
        return axios.post('/api/v1/users/register', userData)
          .catch(err => rejectError(err))
      },
    // Register({commit},userData){
    //    return axios.post("/api/v1/users/register",userData)
    //     .then(response =>{
    //         // commit("REGISTER_USER",data)
    //         console.log(response.data)
    //     })
    //     .catch(err =>{
    //         console.log(err)
    //     })
    // },
    loginWithEmailAndPassword ({commit}, userData) {
        return axios.post('/api/v1/users/login', userData)
          .then(res => {
            const user = res.data
            localStorage.setItem('meetup-jwt', user.token)
            commit('setAuthUser', user)
          })
          .catch(err => rejectError(err))
      },
    getAuthUser({commit,getters}){
        const authUser = getters['authUser']
        const token = localStorage.getItem('meetup-jwt')
        const isTokenValid = checkTokenValidity(token)

        if(authUser && isTokenValid){
            return Promise.resolve(authUser)
        }

        const config ={
            headers:{
                'Cache-Control':'no-cache',
            }
        }

        return axiosInstance.get('/api/v1/users/me',config)
        .then(res =>{
           const user = res.data
           localStorage.setItem('meetup-jwt',user.token)
           commit('setAuthuser',user)
           commit("setAuthState",true)
           return user
        })
        .catch(err=>{
            commit('setAuthuser',null)
            commit('setAuthState',true)
           return undefined
        })
    },
    addMeetupToAuthUser({commit,state},meetupId){
        const userMeetups = [...state.user['joinedMeetups'],meetupId]
        commit("SET_MEETUP_TO_AUTH_USERS",userMeetups)
    },
    removeMeetupFromAuthUser({commit,state},meetupId){
        const userMeetupsIds = [...state.user['joinedMeetups']]
        const index = userMeetupsIds.findIndex(userMeetupId => userMeetupId === meetupId)

        userMeetupsIds.splice(index,1)
        commit('SET_MEETUP_TO_AUTH_USERS',userMeetupsIds)
    },
    logout({commit}){
        return new Promise((resolve,reject)=>{
            localStorage.removeItem('meetup-jwt')
            commit('setAuthuser',null)
            resolve(true)
        })
    },
    updateUser({commit},user){
        return axiosInstance.patch(`/api/v1/users/${user._id}`,user)
        .then(response =>{
            const updateUser = response.data
            commit('setAuthUser',updateUser)
            return updateUser
        })
    }
}

export const mutations ={
    SET_AUTH(state,user){
      return  state.user = user
    },
    setAuthuser(state, user){
        return state.user = user
    },
    setAuthState(state,setAuthState){
       return state.isAuthenResolve = setAuthState
    },
    SET_MEETUP_TO_AUTH_USERS(state,meetups){
        return Vue.set(state.user,'joinedMeetups',meetups)
    }
}