<template>
  <div>
    <h1 class="title m-b-sm">Please confirm entered data</h1>

    <div class="content">
      <div >
        <span class="result-title">
        Location
        </span>
        <p>{{confirmMeetup.location}}</p>
      </div>
      <div>
        <span class="result-title">
        Title
        </span>
        <p>{{confirmMeetup.title}}</p>
      </div>
      <div>
        <span class="result-title">
        Start Date
        </span>
        <p>{{confirmMeetup.startDate}}</p>
      </div>
      <div>
        <span class="result-title">
        From
        </span>
        <p>{{confirmMeetup.timeFrom}}</p>
      </div>
      <div>
        <span class="result-title">
        To
        </span>
        <p>{{confirmMeetup.timeTo}}</p>
      </div>
      <div>
        <span class="result-title">
        Category
        </span>
        <p>{{confirmMeetup.category.name}}</p>
      </div>
      <div>
        <span class="result-title">
        {{confirmMeetup.image}}
        </span>
        <p>Some Event</p>
      </div>
      <div>
        <span class="result-title">
        Short Info
        </span>
        <p>{{confirmMeetup.shortInfo}}</p>
      </div>
      <div>
        <span class="result-title">
        Description
        </span>
        <p>{{confirmMeetup.tdescription}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      confirmMeetup:{
        required:true,
        type:Object
      }
    },
    validations: {}
  }
</script>

<style scoped>
  .result-title {
    font-size: 29px;
    font-weight: bold;
  }

  .result-title + p {
    font-size: 20px;
  }
</style>