import Axios from "axios"



export const state = {
    isLocationResolved:false,
    item:{
        city:'',
        country:''
    }
}

export const getters ={
    location(state){
        const {city,country} = state.item
        return (city && country) ? (city+ ', '+ country): ''
    }
}

export const actions = {
    fetchMetaData({commit,state}){
        return Axios.get('/api/v1/location')
        .then(response=>{
            const meta = response.data
            commit('setItem',meta)
            commit('resolveLocation',true)
            return meta
        })
        .catch(err=>{
            commit('resolveLocation',true)
            return err
        })
    }
}

export const mutations = {
    setItem(state,item){
        state.item = item
    },
    resolveLocation(state,location){
        state.isLocationResolved = location
    }
}

