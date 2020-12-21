

const customPlugin ={
    install: function(Vue,options){
         Vue.myGlobalMethods = function(){
             alert("I am global method!")
         }

         Vue.myGlobalMethods = "I am a custom Property"
    }
}