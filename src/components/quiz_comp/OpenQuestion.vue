<script setup>
import { useCounterStore } from "../../stores/counter";
import { ref, onMounted } from "vue";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

//Component Local data
const questn = ref("");
const answer = ref("");
const _questionID = ref("");
//

// firebase refs
const miscCollectionRef = collection(db, "misc");
const questionCollectionRef = collection(db, "questions");
//

// Firebase data and functions
const misc = ref([]);
const questions = ref([]);

function upDateQuestion() {
  updateDoc(doc(questionCollectionRef, _questionID.value), {
    questionq: questn.value,
    answer: answer.value,
  });
}

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
    _questionID.value = fbmisc[0].questionID;
  });
  onSnapshot(questionCollectionRef, (querySnapshot) => {
    const fbquestions = [];
    querySnapshot.forEach((doc) => {
      const question = {
        id: doc.id,
        questionq: doc.data().questionq,
        answer: doc.data().answer,
        quizID: doc.data().quizID,
      };
      fbquestions.push(question);
    });
    questions.value = fbquestions;
    questions.value.forEach((qst) => {
      if (qst.id === _questionID.value) {
        questn.value = qst.questionq;
        answer.value = qst.answer;
      }
    });
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
        @click="storeCounter.showOQuestion"
        class="rounded p-1 hover:bg-white hover:bg-opacity-80">
        <img src="/img/left.png" class="w-8 h-8 hover:opacity-80" />
      </button>
    </div>
    <form
      @submit.prevent="addQuestion"
      class="flex flex-col items-center bg-beigeL rounded-lg shadow-2xl w-96 h-120">
      <textarea
        v-model="questn"
        type="text"
        name="Question"
        class="p-3 my-10 w-80 h-48 text-sm text-black rounded resize-none shadow focus:outline-none focus:beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
        placeholder="Write your question here..."></textarea>

      <input
        v-model="answer"
        type="text"
        name="Answer"
        class="mb-8 h-10 w-80 p-3 text-sm text-black rounded shadow focus:outline-none focus:beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
        placeholder="Answer" />

      <button
        :disabled="!questn"
        @click="[upDateQuestion(), storeCounter.showOQuestion()]"
        class="text-lg bg-beigeD h-10 w-52 rounded-lg shadow-lg hover:bg-beigeSD">
        Update Question
      </button>
    </form>
  </div>
</template>
