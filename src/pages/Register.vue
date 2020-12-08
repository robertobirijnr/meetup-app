<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         @blur="$v.form.username.$touch()"
                         v-model="form.username"
                         placeholder="Username">
                         <div v-if="$v.form.username.$error" class="form-error">
                             <div v-if="!$v.form.username.required" class="help is-danger">
                                    username is required
                             </div>
                         </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         @blur="$v.form.name.$touch()"
                         v-model="form.name"
                         placeholder="Name">
                          <div v-if="$v.form.name.$error" class="form-error">
                             <div v-if="!$v.form.name.required" class="help is-danger">
                                    name is required
                             </div>
                         </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="email"
                         @blur="$v.form.email.$touch()"
                         v-model="form.email"
                         placeholder="Your Email">
                          <div v-if="$v.form.email.$error" class="form-error">
                             <div v-if="!$v.form.email.required" class="help is-danger">
                                    name is required
                             </div>
                             <div v-if="!$v.form.email.email" class="help is-danger">
                                 email is not valid
                             </div>
                         </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         @blur="$v.form.avatar.$touch()"
                         v-model="form.avatar"
                         placeholder="Avatar"
                         autocomplete="">
                         <div v-if="$v.form.avatar.$error" class="form-error">
                             <div v-if="!$v.form.avatar.url" class="help is-danger">
                                Avatar url format is not valid
                             </div>
                         </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="password"
                         v-model="form.password"
                         placeholder="Your Password"
                         autocomplete="new-password">
                         <div v-if="$v.form.password.$error" class="form-error">
                             <div v-if="!$v.form.password.required" class="help is-danger">
                                 Password is required
                             </div>
                             <div v-if="!$v.form.password.minLength" class="help is-danger">
                                 Password minimun length should be 6
                             </div>
                         </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="password"
                         @blur="$v.form. passwordConfirmation.$touch()"
                         v-model="form.passwordConfirmation"
                         placeholder="Password Confirmation"
                         autocomplete="off">
                         <div v-if="$v.form.passwordConfirmation.$error" class="form-error">
                             <div v-if="!$v.form.passwordConfirmation.required" class="help is-danger">
                                 Password is required
                             </div>
                             <div v-if="!$v.form.passwordConfirmation.sameAs" class="help is-danger">
                                 passwordConfirmation should be the same as password field
                             </div>
                         </div>
                </div>
              </div>
              <button type="submit" :disabled="isformValid" @click.prevent="Register" class="button is-block is-info is-large is-fullwidth">Register</button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link to="/login">Login</router-link> &nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email,minLength,url,sameAs} from 'vuelidate/lib/validators'
  export default {
      data() {
          return {
              form: {
                  username:null,
                  name:null,
                  email:null,
                  avatar:null,
                  password:null,
                  passwordConfirmation:null
              }
          }
      },
      validations:{
         form:{
              username:{
              required
          },
          name:{
              required
          },
          email:{
              required,
              email
          },
          avatar:{
              url
          },
          password:{
              required,
              minLength:minLength(6)
          },
          passwordConfirmation:{
              required,
              sameAs: sameAs('password')
          }
         }
      },
      computed:{
          isformValid(){
              return this.$v.form.$invalid
          }
      },
      methods:{
          Register(){
              this.$v.form.$touch()

          }
      }
  }
</script>

<style scoped>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>