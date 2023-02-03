<script setup>
import router from '../router';

function backToSignIn() {
    router.replace('/sign-in-comp')
}
</script>

<template> 
    <div class="flex justify-center">
        <div class="bg-beigeL pb-20 rounded pl-20 pr-20">           
            <h1 class="text-beigeSD text-5xl font-bold flex justify-center mt-10 mb-10">Quaestio.</h1>
            <div class="mb-10">
                <div class="mb-4">
                    <h3 class="text-lg ml-1">Email</h3>
                    <input type="text" class="h-10 w-80 p-3 border-gray-200 border-1 shadow-sm rounded focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1">
                </div>
                <div class="">
                    <h3 class="text-lg ml-1">Username</h3>
                    <input type="text" class="h-10 w-80 p-3 border-gray-200 border-1 shadow-sm rounded focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1">
                </div>
            </div>
            <div class="mb-10">
                <p class="flex justify-center mb-4  w-80 text-center">An email containing the link to change password will be sent to the provided email.</p>
            </div>
            <div class="flex justify-center">
                <input type="submit" value="Continue" @click="backToSignIn()" class="w-80 text-lg bg-beigeD h-10 rounded-lg shadow-lg hover:bg-beigeSD">
            </div>             
        </div>
    </div>
</template>

