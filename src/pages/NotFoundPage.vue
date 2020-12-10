<template>
  <div class="container">
    <Error :title="'Ooooops, page you are trying to access does not exist'"
     :status="'404'"
      :navigateToPage="'PageHome'" 
      :navigateToText="'Navigate back Home'"/>
  </div>
</template>

<script>
import Error from '@/components/404Component.vue'
  export default {
      components:{
          Error
      }
  }
</script>

<style scoped>
  
</style>