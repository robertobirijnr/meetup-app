<template>
  <div class="meetup-create-form">
    <div class="current-step is-pulled-right">
      {{currentStep}} of {{allStepsCount}}
    </div>
    <!-- Form Steps -->
    <keep-alive>
      <MeetupLocation v-if="currentStep === 1" 
      ref="currentComponent"
      @stepUpdated="mergeStepsData"/>
      <MeetupDetail  v-if="currentStep === 2"
      ref="currentComponent"
       @stepUpdated="mergeStepsData"/>
      <MeetupDescription  v-if="currentStep === 3" 
      ref="currentComponent"
      @stepUpdated="mergeStepsData"/>
      <MeetupConfirmation  v-if="currentStep === 4" :confirmMeetup="form"/>
    </keep-alive>

    <progress class="progress" :value="currentProgress" max="100">{{currentProgress}}%</progress>
    <div class="controll-btns m-b-md">
      <button
      v-if="currentStep !==1" @click="moveToPrevStep"
       class="button is-primary m-r-sm">Back</button>
      <button :disabled="!canProceed" v-if="currentStep !== allStepsCount" @click="moveToNextStep" class="button is-primary">Next</button>
      <!-- Confirm Data -->
       <button v-else
        @click="emitMeetup"
              class="button is-primary">Confirm</button> 
    </div>
    <!-- Just To See Data in the Form -->
    <!-- <pre><code>{{form}}</code></pre> -->
  </div>
</template>

<script>
  import MeetupLocation from './MeetupLocation'
  import MeetupDetail from './MeetupDetail'
  import MeetupDescription from './MeetupDescription'
  import MeetupConfirmation from './MeetupConfirmation'
  export default {
    components: {
      MeetupLocation,
      MeetupDetail,
      MeetupDescription,
      MeetupConfirmation,
      
    },
    data () {
      return {
        currentStep:1,
        allStepsCount:4,
        canProceed:false,
        form: {
          location: null,
          title: null,
          startDate: null,
          category: null,
          image: null,
          shortInfo: null,
          description: null,
          timeTo: null,
          timeFrom: null
        }
      }
    },
    computed:{
      currentProgress(){
        return (100 / this.allStepsCount) * this.currentStep
      }
    },
    methods:{
      mergeStepsData(step){
        this.form = {...this.form, ...step.data}
        this.canProceed = step.valid
      },

      moveToNextStep(){
        this.currentStep++

        this.$nextTick(()=>{
           this.canProceed = !this.$refs['currentComponent'].$v.$invalid
        }) 
      },
      moveToPrevStep(){
        this.currentStep--
        this.canProceed = true
      },
      emitMeetup(){
        this.$emit('meetupConfirm',this.form)
      }
    }
  }
</script>

<style scoped>
  .meetup-create-form {
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 840px;
    padding: 24px 16px 8px;
    width: 100%;
  }
</style>