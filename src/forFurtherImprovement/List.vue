<script setup>
import { ref, onMounted, computed, watch } from "vue";
import SubjectsComp from "../body/SubjectsComp.vue";

// forms of lists
// 1 - quizes
// 2 - questions
// 3 - Subjects
// 4 - tags (no sort and filter)
// 5 - notes (no share)
// 6 - search (no title)

const subject = ref([]);
const notes = ref([]);
const questions = ref([]);

const tags = ref([]);

const quizzes = ref([]);
const quizTitle = ref("");

const addQuiz = () => {
  quizzes.value.push({
    qTitle: "lah",
  });
};

// quiz[0] = (['lah'], ['leh'],['luh'] );

// const setAddResult = (type) => {
//     switch(type) {
//         case 0:
//             // set router link to chuchu
//             break;
//         case 1:
//             //set router linl to chuchu
//             break;
//         default:
//     }
// };
</script>

<template>
  <div class="flex flex-col">
    <!-- paramenter: TitleName, max-height, max-width -->

    <div class="inline-flex items-center m-2">
      <!-- Get title content: Notes, Quizes, Questions, CustomTags, -->
      <!-- Plus icon links depend on Title-->
      <h4 class="mr-2 text-lg font-bold">List Title</h4>
      <button @click="addQuiz()">click</button>

      <!-- put title param! -->
      <RouterLink to="/create-subject"
        ><img class="w-3 h-3" src="/img/add.png"
      /></RouterLink>
    </div>

    <!-- <div class="grid grid-cols-2 ">
            <div class="inline-flex items-center ml-5">
                <RouterLink to="/sort" class="inline-flex items-center mr-5 ">Sort<img class="ml-2 w-3 h-3" src="/img/caret-down.png"></RouterLink> 
                <RouterLink to="/filter" class="inline-flex items-center">Filter<img class="ml-2 w-3 h-3" src="/img/caret-down.png"></RouterLink> 
            </div>

            <div class="inline-flex justify-end items-center mr-8">
                get all items that was checked then either: Share or Delete
                <RouterLink to="/tools"><img class="w-3 h-3" src="/img/menu-dot.png"/></RouterLink>
            </div>    
        </div> -->

    <!-- use v-for or inject content of qui object array-->
    <!-- Set max-height -->
    <!-- <div  class="bg-beigeL m-2 rounded">
            Function to show the content of list
            <div class="flex justify-between bg-beigeD m-2 rounded-3xl h-10 items-center">
                <h4 class="m-5">Content Name</h4>
                <input type="checkbox" class="mr-5">
            </div>
            <div class="flex justify-between bg-beigeD m-2 rounded-3xl h-10 items-center">
                <h4 class="m-5">Content Name</h4>
                <input type="checkbox" class="mr-5">
            </div>
            <div class="flex justify-between bg-beigeD m-2 rounded-3xl h-10 items-center">
                <h4 class="m-5">Content Name</h4>
                <input type="checkbox" class="mr-5">
            </div>
            
        </div> -->
    <section class="border-solid border-2 m-2">
      <p>list</p>
      <div v-for="quiz in quizzes">
        <input type="text" v-model="quizzes.qTitle" />
      </div>
    </section>
  </div>
</template>

<style></style>
