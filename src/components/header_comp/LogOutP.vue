<script setup>
import router from "../../router";
import { storeToRefs } from "pinia";
import { useCounterStore } from "../../stores/counter";

//Other functions
function logOut() {
  router.replace("/");
}
//

//Pinia Modal
const storeCounter = useCounterStore();
//
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div
      class="flex flex-col md:flex-col justify-center items-center bg-beigeL rounded-lg shadow-2xl w-auto h-auto">
      <div class="flex flex-col md:grid md:grid-row-2 md:mt-0 mt-5">
        <h3 class="text-xl font-semibold my-8 mx-10">
          Are you sure you want to Log Out?
        </h3>
        <div class="flex justify-around flex-row mb-10 mx-5">
          <input
            type="submit"
            value="Cancel"
            @click="storeCounter.showLogOutP()"
            class="text-lg bg-beigeD h-10 w-36 rounded-lg shadow-lg hover:bg-beigeSD" />
          <input
            type="submit"
            value="Confirm"
            @click="
              [
                logOut(),
                storeCounter.showLogOutP(),
                storeCounter.showEProfile(),
              ]
            "
            class="text-lg bg-red-400 h-10 w-36 rounded-lg shadow-lg hover:bg-red-600" />
        </div>
      </div>
    </div>
  </div>
</template>
