import axiosInstance from '../../service/axios'

export const state ={
    meetups:{
       data: [],
       count:null
    },
    threads:{
        data:[],
        count:null
    },
    posts:{
        data:[],
        count:null
    }
}

export const actions ={
    fetchUserStats({commit}){
       return axiosInstance.get(`/api/v1/users/me/activity`)
        .then(response=>{
            const stats = response.data
            commit('setStats',stats)
            return stats
        })
    }
}

export const mutations = {
    setStats(state,stats){
     return Object.assign(state, {}, stats)
    }
}