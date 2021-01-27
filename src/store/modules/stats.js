import threads from '../../../server/models/threads'
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
    },
    updateStat({state,commit}, meetupId){
        commit('deleteMeetup',meetupId)

        state.threads.data.filter(thread=>{
            return thread.meetup === meetupId
        }).flatMap(thread =>{
            commit('deleteThread', thread._id)
            return thread.posts
        }).map(postId =>{
            commit('deletePost',postId)
        })
    }
}

export const mutations = {
    setStats(state,stats){
     return Object.assign(state, {}, stats)
    },
    deleteMeetup(state,meetupId){
        const index = state.meetups.data.findIndex(meetup => meetup._id === meetupId)
        state.meetups.data.splice(index,1)
        state.meetups.count--
    },
    deleteThread(state,threadId){
        const index = state.threads.data.findIndex(thread =>thread._id === threadId)
        state.threads.data.splice(index,1)
        state.threads.count--
    },
    deletePost(state,postId){
        const index = state.posts.data.findIndex(post =>post._id === postId)
        state.posts.data.splice(index,1)
        state.posts.count--
    }
}