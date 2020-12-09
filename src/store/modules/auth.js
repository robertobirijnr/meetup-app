import axios from 'axios'


export const state ={
    user:null
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
            commit('SET_AUTH',response.data)
        }).catch(err =>{
            console.log(err)
        })
    }
}

export const mutations ={
    SET_AUTH(state,user){
      return  state.user = user
    }
}