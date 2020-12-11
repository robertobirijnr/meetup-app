<template>
  <div>
    <AppHero />
    <div v-if="loading" class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Meetups in "Location"</h1>
        <AppDropdown />
        <router-link v-if="user" to="/meetups/create" class="button is-primary is-pulled-right m-r-sm">Create Meetups</router-link>
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
    <center v-else>
      <div class="container" >
      <AppSpinner/>
    </div>
    </center>
  </div>
</template>

<script>
import {mapActions, mapState,mapGetters} from 'vuex'
import CategoryItem from '../components/shared/CategoryItem.vue'
import MeetupItem from '../components/MeetupItem.vue'

  export default {
    components:{
      CategoryItem,
        MeetupItem
    },
     data() {
       return {
         loading: false
       }
     },
     computed:{
       ...mapGetters({
         user:'authUser'
       }),
       ...mapState({
         meetups:state => state.meetups.meetups,
         categories:state => state.categories.categories
       })
      
     },

    created(){
      Promise.all([this.fetchMeetups(),this.fetchCategories()])
      .then(()=>this.loading = true)
      
      // this.fetchMeetups()
      // .then(()=>{
      //   return this.fetchCategories()
      // })
      // .then(()=>{
      //   this.loading = true
      // })
  },

  methods:{
    ...mapActions(['fetchMeetups','fetchCategories'])
  }
  }
</script>

<style scoped>
 
</style>
