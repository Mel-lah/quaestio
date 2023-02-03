<script setup>
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";
import TagList from "./TagList.vue";

const { sTag } = storeToRefs(useCounterStore());
const storeCounter = useCounterStore();
</script>

<template>
    <!-- paramenter are: tag-type, this.ID, -->
    <div class="inline-flex items-center mx-2 z-0">
        <img class="w-3 h-3 m-2" src="/img/tag.png" alt="tag">
        <!-- get tags of .this content -->
        <h4 class="vtbe">display the subject tags</h4>
        
        <button @click="storeCounter.showTag" class="mr-3">
            <img class="w-3 h-3 m-2 hover:opacity-40" src="/img/add.png"/>
        </button>
    </div>

    <div v-if="sTag"
        class="fixed inset-0 z-50 bg-gray-500 bg-opacity-40  justify-center items-center">
        <TagList />
    </div>


</template>
