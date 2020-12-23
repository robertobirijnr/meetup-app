<template>
  <div>
    <h1 class="title m-b-sm">What's your new Meetup location?</h1>
    <div class="m-b-lg">
      <span v-if="ipLocation && !changeLocation" class="subtitle">{{ipLocation}}</span>

      <a v-if="ipLocation" @click=" toggleLocation">(change location)</a>

      <input v-if="!ipLocation || changeLocation"
       @blur="$v.form.location.$touch()" 
      @input="emitFormData" 
      v-model="form.location" 
      type="text" class="input">
      <div v-if="$v.form.location.$error">
        <span v-if="!$v.form.location.required" class="help is-danger">Location is required</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        changeLocation:false,
         form: {
           location: null
        }
      }
    },
    computed:{
      ipLocation(){
        return this.$store.getters['location']
      }
    },
    validations: {
      form: {
        location:{ required}
      }
    },
    created(){
      if(this.ipLocation){
        this.form.location = this.ipLocation
        this.emitFormData()
      }
    },
    methods:{
      emitFormData(){
        this.$emit('stepUpdated',{
          data:this.form,valid: !this.$v.$invalid
        })
      },
      toggleLocation(){
        if(this.ipLocation){
           this.form.location = this.ipLocation
           this.emitFormData()
        }
        this.changeLocation = !this.changeLocation
      }
    }
  }
</script>

<style scoped>