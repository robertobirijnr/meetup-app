<template>
  <div class="meetup-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <MeetupCreateWizard @meetupConfirm="createMeetup" />
      </div>
    </section>
  </div>
</template>

<script>
  import MeetupCreateWizard from '@/components/MeetupCreate/MeetupCreateWizard'
  export default {
    components: {
      MeetupCreateWizard
    },
    computed:{
      categories(){
        return this.$store.state.categories.categories
      }
    },
    created(){
     if(this.categories.length === 0){
        this.$store.dispatch('fetchCategories')
     }
    },
    methods:{
      createMeetup(meetupToCreate){
        this.$store.dispatch('createMeetup',meetupToCreate)
      }
    }
  }
</script>

<style scoped lang="scss">
  .meetup-create-page {
    min-height: 100vh;
  }
</style>