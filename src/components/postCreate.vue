<template>
     <form class="post-create">
        <div class="field">
        <textarea
        v-auto-expand
         class="textarea textarea-post"
         v-model="text"
                    placeholder="Write a post"
                    rows="1"></textarea>
        <button @click.prevent="sendPost" :disabled="!text" class="button is-primary m-t-sm">Send</button>
        </div>
        </form>
</template>

<script>
import autoExpand from '@/directives/autoExpand'
    export default {
        props:{
            threadId:{
                required:true,
                type:String
            }
        },
        directives:{
            autoExpand
        },
        data() {
            return {
                text: null
            }
        },
        methods:{
            sendPost(){
                this.$store.dispatch('sendPost',{text: this.text,threadId: this.threadId})
                .then(()=>{
                    this.text = ""
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.textarea-post {
    padding-bottom: 30px;
  }

  .post-create {
    margin-bottom: 15px;
  }
</style>