<script setup>
import { useCounterStore } from "../../stores/counter";
import { ref, onMounted } from "vue";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

// firebase refs
const miscCollectionRef = collection(db, "misc");
const noteCollectionRef = collection(db, "notes");
//

// Firebase data and functions
const misc = ref([]);
const noteTitle = ref("");
const noteContent = ref("");

const addNote = () => {
  addDoc(noteCollectionRef, {
    subjectID: misc.value[0].subjectID,
    note_title: noteTitle.value,
    note: noteContent.value,
    date: Date.now(),
  });
  noteTitle.value = "";
  noteContent.value = "";
};

// Get misc data from firebase to get subjectID
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
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="md:mr-100 mr-80">
      <button
        @click="[storeCounter.showCNote(), addNote()]"
        class="rounded p-1 hover:bg-white hover:bg-opacity-80">
        <img src="/img/left.png" class="w-8 h-8 hover:opacity-80" />
      </button>
    </div>
    <div class="bg-beigeL rounded-lg shadow-2xl w-96 md:w-200 h-3/4">
      <form @submit.prevent="addNote">
        <div class="m-5 flex justify-between">
          <input
            v-model="noteTitle"
            class="h-10 w-full p-3 rounded border-gray-200 border-1 shadow-sm focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:beigeD focus:shadow-lg"
            type="text"
            name="SubjectTitle"
            placeholder="Note Title" />
        </div>
        <div class="m-5 flex justify-between">
          <textarea
            v-model="noteContent"
            wrap="hard"
            class="p-2 h-150 w-full text-sm text-black rounded resize-none shadow focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:outline-none focus:beigeD focus:shadow-lg"></textarea>
        </div>
      </form>
    </div>
  </div>
</template>
