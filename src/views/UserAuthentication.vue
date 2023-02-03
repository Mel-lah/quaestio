<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import SignInComp from "../components/user-auth/SignInComp.vue";
import Title from "../components/user-auth/Title.vue";

const showTitle = ref(true);
const toggleTitle = () => {
  showTitle.value = false;
};


</script>

<template>
  <main>
    <div class=" flex justify-center mt-40">
      <RouterLink @click="toggleTitle()" to="/sign-in-comp" class="mr-5 px-16 py-3 font-semibold bg-gray-200 rounded-tl rounded-tr text-gray-400  focus:bg-beigeL  focus:text-black ">Sign In</RouterLink>
      <RouterLink @click="toggleTitle()" to="/sign-up-comp" class="px-16 py-3 font-semibold bg-gray-200 rounded-tl rounded-tr text-gray-400 focus:bg-beigeL  focus:text-black">Sign Up</RouterLink> 
    </div>
    
    <div v-if="showTitle">
       <Title />
    </div>
    <RouterView />
  </main>
</template>


