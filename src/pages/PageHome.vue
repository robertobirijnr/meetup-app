<template>
  <div>
    <AppHero />
    <div class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Meetups in "Location"</h1>
        <AppDropdown />
        <button class="button is-primary is-pulled-right m-r-sm">Create Meetups</button>
        <router-link to="/find" class="button is-primary is-pulled-right m-r-sm">All</router-link>
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
     
     computed:{
       meetups(){
         return this.$store.state.meetups
       },
       categories(){
         return this.$store.state.categories
       }
     },

    created(){
      this.$store.dispatch('fetchMeetups')
       this.$store.dispatch('fetchCategories')
  }
  }
</script>

<style scoped>
 
</style>
