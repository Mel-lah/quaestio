<script setup>
import CQuiz from "./CQuiz.vue";
import { useCounterStore } from "../../stores/counter";
import { ref, onMounted, computed, watch } from "vue";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

// firebase refs
const miscCollectionRef = collection(db, "misc");
const quizCollectionRef = collection(db, "quizzes");
const quizCollectionQuery = query(quizCollectionRef, orderBy("date", "desc"));
//

// Firebase data and functions
const quizzes = ref([]);
const misc = ref([]);

const setGlobalQuizID = (id) => {
  const index = quizzes.value.findIndex((quiz) => quiz.id === id);
  const temp = quizzes.value[index].id;

  updateDoc(doc(miscCollectionRef, "vXGvTZM9HWJ27w9emuXo"), {
    quizID: temp,
  });
};

const deletequiz = (id) => {
  deleteDoc(doc(quizCollectionRef, id));
};

onMounted(() => {
  onSnapshot(quizCollectionQuery, (querySnapshot) => {
    const fbquizzes = [];
    querySnapshot.forEach((doc) => {
      const quiz = {
        id: doc.id,
        quiz_title: doc.data().quiz_title,
      };
      fbquizzes.push(quiz);
    });
    quizzes.value = fbquizzes;
  });
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

//Pinia Modal
const storeCounter = useCounterStore();
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="md:mr-100 mr-80">
      <button
        @click="storeCounter.showChangeQuiz"
        class="rounded p-1 hover:bg-white hover:bg-opacity-80">
        <img src="/img/left.png" class="w-8 h-8 hover:opacity-80" />
      </button>
    </div>
    <div class="bg-beigeL rounded-lg shadow-2xl w-96 md:w-200 h-3/4">
      <CQuiz />
      <div id="quizList">
        <h3 class="font-bold text-xl ml-10 mb-2">Quizzes</h3>
        <div
          class="flex flex-col overflow-y-scroll pt-3 h-110 mb-8 bg-white mx-5 rounded shadow">
          <!-- Iterate all quiz -->
          <div v-for="quiz in quizzes" class="mx-3">
            <!-- get this.id -->
            <div class="flex justify-center">
              <button
                @click="
                  [setGlobalQuizID(quiz.id), storeCounter.showChangeQuiz()]
                "
                class="h-10 mb-3 w-170 mr-2 bg-beigeD rounded-3xl hover:bg-beigeSD">
                {{ quiz.quiz_title }}
              </button>
              <button
                @click="deletequiz(quiz.id)"
                class="justify-end h-10 text-black font-bold hover:text-red-500">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
