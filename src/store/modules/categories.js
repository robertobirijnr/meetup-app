import axios from 'axios'


export const state ={
    categories:[],
}

export const actions ={
    fetchCategories({commit}){
        axios.get('/api/v1/categories')
        .then(response =>{
            commit("SET_CATEGORIES",response.data)
        })
        .catch(err=>{
            alert(err)
        })
     },
}

export const mutations ={
    SET_CATEGORIES(state,categories){
        state.categories = categories
    },
}