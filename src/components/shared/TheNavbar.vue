<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1 class="title is-4">VueMeetuper</h1>
      </router-link>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          Home
        </router-link>

        <router-link to="/find" class="navbar-item">
          Find
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
       <div class="navbar-item">
        <div v-if="user">
          Welcome {{user.username}}
        </div>
      </div>
      <div v-if="user" class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
            Account
        </a>
        <div class="navbar-dropdown">
          <router-link to="/me" class="navbar-item">
              Profile
          </router-link>
          <hr class="navbar-divider">
          <a @click.prevent="logout" class="navbar-item">
              Logout
          </a>
        </div>
      </div>
        <div v-else class="navbar-item has-dropdown ">
          <div class="buttons">
            <router-link to="/register" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link to="/login" class="button is-light">
              Log in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {

    computed:{
      ...mapGetters({
        'user':'authUser'
      })
    },
    methods:{
      logout(){
        this.$store.dispatch('logout')
        .then(()=>{
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style scoped>
</style>
