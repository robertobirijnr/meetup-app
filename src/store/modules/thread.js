import axios from 'axios'


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
}

export const mutations ={
    SET_MEETUP_THREADS(state,threads){
        state.threads = threads
    },
}