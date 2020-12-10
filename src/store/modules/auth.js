import axios from 'axios'
import jwt from 'jsonwebtoken'
import axiosInstance from '../../service/axios'

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
    }
}

export const actions ={
    Register({commit},data){
       return axios.post("/api/v1/users/register",data)
        .then(response =>{
            // commit("REGISTER_USER",data)
            console.log(response.data)
        })
        .catch(err =>{
            console.log(err)
        })
    },
    Login({commit},data){
      return  axios.post('/api/v1/users/login',data)
        .then(response=>{
            const user = response.data
            localStorage.setItem('meetup-jwt',user.token)
            commit('SET_AUTH',user)
        }).catch(err =>{
            console.log(err)
        })
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
    logout({commit}){
        return axios.post('/api/v1/users/logout')
        .then(()=>{
            commit('setAuthuser',null)
            return true
        })
        .catch(err =>{
            console.log(err)
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
    }
}