<script setup>
import { useCounterStore } from "../../stores/counter";
import { ref, onMounted } from "vue";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

// firebase refs
const miscCollectionRef = collection(db, "misc");
const questionCollectionRef = collection(db, "questions");
//

// Firebase data and functions
const misc = ref([]);
const newQuestionQ = ref("");
const newAnswer = ref("");

const addQuestion = () => {
  addDoc(questionCollectionRef, {
    quizID: misc.value[0].quizID,
    questionq: newQuestionQ.value,
    answer: newAnswer.value,
    user_ans: "",
    date: Date.now(),
  });
  newQuestionQ.value = "";
  newAnswer.value = "";
};

// Get misc data from firebase to get quizID
onMounted(() => {
  onSnapshot(miscCollectionRef, (querySnapshot) => {
    const fbmisc = [];
    querySnapshot.forEach((doc) => {
      const msc = {
        id: doc.id,
        userID: doc.data().userID,
        subjectID: doc.data().subjectID,
        noteID: doc.data().noteID,
        quizID: doc.data().quizID,
        questionID: doc.data().questionID,
      };
      fbmisc.push(msc);
    });
    misc.value = fbmisc;
  });
});
//

// Pinia Modal
const storeCounter = useCounterStore();
//
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="mr-80">
      <button
        @click="storeCounter.showCQuestion"
        class="rounded p-1 hover:bg-white hover:bg-opacity-80">
        <img src="/img/left.png" class="w-8 h-8 hover:opacity-80" />
      </button>
    </div>
    <form
      @submit.prevent="addQuestion"
      class="flex flex-col items-center bg-beigeL rounded-lg shadow-2xl w-96 h-120">
      <textarea
        v-model="newQuestionQ"
        type="text"
        name="Question"
        class="p-3 my-10 w-80 h-48 text-sm text-black rounded resize-none shadow focus:outline-none focus:beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
        placeholder="Write your question here..."></textarea>

      <input
        v-model="newAnswer"
        type="text"
        name="Answer"
        class="mb-8 h-10 w-80 p-3 text-sm text-black rounded shadow focus:outline-none focus:beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
        placeholder="Answer" />

      <button
        :disabled="!newQuestionQ"
        class="text-lg font-semibold bg-beigeD h-10 w-52 rounded-lg shadow-lg hover:bg-beigeSD">
        Add Question
      </button>
    </form>
  </div>
</template>
