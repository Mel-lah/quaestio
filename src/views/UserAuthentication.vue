<script setup>
import { RouterView } from "vue-router";
import { useCounterStore } from "../stores/counter";
import { storeToRefs } from "pinia";
import Title from "../components/user-auth/Title.vue";

//Pinia Modal
const { sTitle } = storeToRefs(useCounterStore());
const storeCounter = useCounterStore();
//
</script>

<template>
  <main>
    <div class="flex justify-center mt-40">
      <RouterLink
        @click="storeCounter.hideTitle()"
        to="/sign-in-comp"
        class="mr-5 px-16 py-3 font-semibold bg-gray-200 rounded-tl rounded-tr text-gray-400 focus:bg-beigeL focus:text-black"
        >Sign In</RouterLink
      >
      <RouterLink
        @click="storeCounter.hideTitle()"
        to="/sign-up-comp"
        class="px-16 py-3 font-semibold bg-gray-200 rounded-tl rounded-tr text-gray-400 focus:bg-beigeL focus:text-black"
        >Sign Up</RouterLink
      >
    </div>

    <div v-if="sTitle">
      <Title />
    </div>
    <RouterView />
  </main>
</template>
