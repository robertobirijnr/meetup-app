import axios from 'axios'
import axiosInstance from '../../service/axios'
import Vue from 'vue'



export const state ={
    threads:[],
}

export const actions ={
    fetchThreads({commit},meetupId){
        axios.get(`/api/v1/threads?meetupId=${meetupId}`)
        .then(response=>{
         commit("SET_MEETUP_THREADS",response.data)
        })
        .catch(err=>{
            alert(err)
        })
     },

     postThread({commit,state},{title,meetupId}){
         const thread = {}
         thread.title = title
         thread.meetup = meetupId
        return axiosInstance.post('/api/v1/threads',thread)
        .then(response =>{
            const createdThread = response.data
            console.log(createdThread)
            const index = state.threads.length

            commit('addThreadToArray',{createdThread,index})
            return createdThread
        })
     },
     sendPost({commit,state,dispatch},{text,threadId}){
            const post = {text, thread: threadId}
        return axiosInstance.post('/api/v1/posts',post)
        .then(response=>{
            const createdPost = response.data
            dispatch('addPostToThread',{post:createdPost,threadId})
            return createdPost
        })
     },
     addPostToThread({commit,state},{post,threadId}){
         const threadIndex = state.threads.findIndex(thread => thread._id === threadId)

         if(threadIndex > -1){
             const posts = state.threads[threadIndex].posts
             posts.unshift(post)
             commit('savePostThread',{posts,index:threadIndex})
         }
     }
}


export const mutations ={
    SET_MEETUP_THREADS(state,threads){
        state.threads = threads
    },
    addThreadToArray(state,index){
        Vue.set(state.threads, index)
    },
    savePostThread(state,{posts, index}){
        Vue.set(state.threads[index],'posts',posts)
    }
}