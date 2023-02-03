<script setup>
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";
import EditProfile from './EditProfile.vue';

const { seProfile } = storeToRefs(useCounterStore());
const storeCounter = useCounterStore();
</script>

<template>
    <div class="grid grid-cols-2 px-5 bg-beigeD shadow-md">
        <div class="inline-flex items-center" > 
            <img class="w-10 h-10" src="/img/ppic.png" alt="Quaestio Icon" >
            <h2 class="p-4 font-bold text-2xl text-beigeSD">
                Quaestio.
            </h2>          
        </div>

        <div class="inline-flex justify-end items-center">
            <button @click="storeCounter.showEProfile" class="hover:opacity-50 shadow-lg rounded-3xl hover:shadow-lg">
                <img class="w-10 h-10 rounded-3xl " src="/img/ppic.png" alt="Profile Pic">
            </button>
        </div>

        <div v-if="seProfile"
            class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50  justify-center items-center">
            <EditProfile />
        </div>
    </div>
</template>

<style>
.notif{
    height: 1.5em;
}
</style>