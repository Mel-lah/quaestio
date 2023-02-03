<script setup>
import QuestionList from "./QuestionList.vue";
import ChangeQuiz from "./ChangeQuiz.vue";
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";

//Pinia Modal
const { schngQuiz } = storeToRefs(useCounterStore());
const storeCounter = useCounterStore();
</script>

<template>
  <div class="border-solid border-1 border-beigeD rounded-md shadow-lg">
    <div class="inline-flex items-center">
      <h3 class="text-lg font-bold my-2 mx-3">Quizzes</h3>
      <button @click="storeCounter.showChangeQuiz" class="mr-3">
        <img class="w-4 h-4 hover:opacity-40" src="/img/menu.png" />
      </button>
    </div>
    <div class="border-solid bg-beigeL rounded mx-3 mb-2 shadow">
      <div v-if="!schngQuiz">
        <QuestionList />
      </div>
    </div>
    <div
      v-if="schngQuiz"
      class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center">
      <ChangeQuiz />
    </div>
  </div>
</template>
