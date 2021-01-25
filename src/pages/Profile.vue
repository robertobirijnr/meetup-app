<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <figure class="image  header-icon user-profile-image">
              <!-- TODO: Get user avatar here -->
              <img class="is-rounded" :src="user.avatar"/>
            </figure>
          </div>
          <div class="column is-4-tablet is-10-mobile name">
            <p>
              
              <span class="title is-bold">{{user.name}}</span>
              <br/>
              <!-- Here will be user update functionality -->
              <update-user-profile :authuser="user" @userSubmitted="updateUser"/>
              <br/>
            </p>
           
            <!-- <p class="tagline">
              {{user.info}}
            </p> -->
          </div>
        
          <div @click="activeTab = 'meetups'"
          :class="{isActive:activeTab === 'meetups'}" 
          class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{meetupsCounts}}</p>
            <p class="stat-key">Meetups</p>
          </div>
         
          <div @click="activeTab = 'threads'"
           :class="{isActive:activeTab === 'threads'}" 
           class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{threadsCounts}}</p>
            <p class="stat-key">Threads</p>
          </div>
          
          <div @click="activeTab = 'posts'" 
           :class="{isActive:activeTab === 'posts'}" 
          class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{postsCounts}}</p>
            <p class="stat-key">Posts</p>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'meetups'" class="columns is-mobile is-multiline">
        <div v-for="meetup in meetups" :key="meetup.index" class="column is-3-tablet is-6-mobile">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="meetup.image"/>
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                 
                  <p class="title is-4">{{meetup.title}}</p>
                  
                  <p class="subtitle is-6"><span class="tag is-dark subtitle">{{meetup.category.name}}</span></p>
                </div>
              </div>
              <div class="content">
                <p>
                 {{meetup.shortInfo}}
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{name:'UpdateMeetupEdit', params:{meetupId: meetup._id}}" class="card-footer-item">Edit</router-link>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>

      <div v-if="activeTab === 'threads'" class="columns is-mobile is-multiline">
        <div v-for="thread in threads" :key="thread.index" class="column is-3-tablet is-6-mobile">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{thread.title}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>

      <div v-if="activeTab === 'posts'" class="columns is-mobile is-multiline">
        <div v-for="post in posts" :key="post.index" class="column is-3-tablet is-6-mobile">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{post.text}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import updateUserProfile from '../components/updateUserProfile.vue'
export default {
  components: { updateUserProfile },
    data() {
        return {
            activeTab: "meetups"
        }
    },
    computed:{
        ...mapState({
            user: state => state.auth.user,
            meetups: state => state.stats.meetups.data,
            threads: state => state.stats.threads.data,
            posts: state => state.stats.posts.data,
            meetupsCounts:state => state.stats.meetups.count,
            threadsCounts:state => state.stats.threads.count,
            postsCounts:state => state.stats.posts.count
        })
    },
    created(){
       this.$store.dispatch('fetchUserStats')
       .then(stats =>{
           console.log(stats)
       })
    },
    methods:{
        updateUser({user,done}){
            this.$store.dispatch('updateUser',user)
            .then(()=>{
                this.$toasted.success("Profile successfully updated",{duration:3000})
                done()
            })
        }
    }
}
</script>


<style scoped>
  body {
    background: #F5F7FA
  }

  .stats-tab {
    border-bottom: 2px solid transparent;
    transition: 0.5s;
  }

  .stats-tab:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
  }

  .stats-tab.isActive {
    border-bottom: 2px solid black;
  }

  .stat-val {
    font-size: 3em;
    padding-top: 20px;
    font-weight: bold;
  }

  .stat-key {
    font-size: 1.4em;
    font-weight: 200
  }

  .section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
    border-left: 1px dotted rgba(0, 0, 0, .2);
  }

  .container.profile {
    margin-top: 1%;
  }

  .control.is-pulled-left span.select {
    margin-right: 5px;
    border-radius: 2px;
  }

  .modal-card .content h1 {
    padding: 40px 10px 10px;
    border-bottom: 1px solid #dadada
  }

  .container.profile .profile-options .tabs ul li.link a {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #F1F1F1;
  }
</style>