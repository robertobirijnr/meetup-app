<template>
  <div>
    <AppHero />
    <div class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Meetups in "Location"</h1>
        <AppDropdown />
        <button class="button is-primary is-pulled-right m-r-sm">Create Meetups</button>
        <button class="button is-primary is-pulled-right m-r-sm">All</button>
      </div>
      <div class="row columns is-multiline" >
       <meetup-item v-for="meetup in meetups" :key="meetup.id" :meetup="meetup"/>
      </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile" >
            <CategoryItem v-for="category in categories" :key="category.index" :category="category"/>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CategoryItem from '../components/shared/CategoryItem.vue'
import MeetupItem from '../components/MeetupItem.vue'

  export default {
    components:{
      CategoryItem,
        MeetupItem
    },
     data(){
        return{
         categories:[],
         meetups:[]
       }
     },

    created(){
      axios.get('/api/v1/meetups')
      .then(response =>{
        this.meetups = response.data
      })
      .catch(err =>{
        console.log(err)
      })

      axios.get('/api/v1/categories')
      .then(response =>{
        this.categories = response.data
      })
      .catch(err=>{
        alert(err)
      })
    }
  }
</script>

<style scoped>
 
</style>
