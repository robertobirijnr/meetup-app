<template>
  <div class="container">
    <Error :title="'Ooooops, Your are not permit to see this page, please login '"
     :status="'401'"
      :navigateToPage="'PageHome'" 
      :navigateToText="'Navigate to Login Page'"/>
  </div>
</template>

<script>
import Error from '@/components/404Component.vue'
  export default {
    name:"PageNotAuth",
      components:{
          Error
      }
  }
</script>

<style scoped>
  
</style>