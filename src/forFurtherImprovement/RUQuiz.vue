<script setup>
import TagsDisplay from "../common/TagsDisplay.vue";
import List from "../forFurtherImprovement/List.vue";
import Description from "../common/Description.vue";
import { useCounterStore } from "../../stores/counter";

const storeCounter = useCounterStore();
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="mr-100">
      <button @click="storeCounter.showQuestions" class="">
        <img src="/img/left.png" class="w-8 h-8" />
      </button>
    </div>

    <div
      class="flex flex-col justify-center items-center bg-beigeL rounded-lg shadow-2xl w-200 h-3/4">
      <div>
        <input type="text" name="QuizTitle" id="" />

        <div class="diplay-tags">
          <h3 class="activity">Tags</h3>
          <RouterLink to="/tags-list">
            <img class="w-5 h-5" src="/img/add.png" />
          </RouterLink>
          <TagsDisplay />
        </div>

        <Description />

        <div class="diplay-questions">
          <!-- param is question and qiuzTitle -->
          <List />
        </div>

        <input type="submit" value="SaveQuiz" />

        <!-- if read -->
        <p class="tbe">[tools]</p>
        <input type="submit" value="AnswerQuiz" />
      </div>
    </div>
  </div>
</template>
