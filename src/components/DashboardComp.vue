<script setup>
import HeaderComp from "./header_comp/HeaderComp.vue";
import SubjectsComp from "./subj_comp/SubjectsComp.vue";
import QuizzesComp from "./quiz_comp/QuizzesComp.vue";
import { ref } from "vue";

// const inputToList = ref([]);
// const listTitle = ref("");
// const subject = ref([]);
</script>

<template>
  <HeaderComp />

  <div class="flex flex-col md:grid md:grid-cols-2 px-10 py-6">
    <div class="mb-10 md:mb-0 md:mr-5">
      <SubjectsComp />
    </div>

    <div class="md:ml-5">
      <QuizzesComp />
    </div>
  </div>

  <RouterView />
</template>
